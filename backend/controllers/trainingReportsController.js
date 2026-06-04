const TrainingReport = require('../models/TrainingReport');
const Personnel = require('../models/Personnel');
const Unit = require('../models/Unit');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;
    const offset = (page - 1) * limit;

    let where = {};
    if (startDate && endDate) {
      where.training_time = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const { count, rows } = await TrainingReport.findAndCountAll({
      where,
      include: [{
        model: Personnel,
        as: 'trainer',
        include: [{ model: Unit, as: 'unit' }]
      }],
      offset,
      limit: parseInt(limit),
      order: [['training_time', 'DESC']]
    });

    res.json({
      data: rows,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const report = await TrainingReport.findByPk(req.params.id, {
      include: [{
        model: Personnel,
        as: 'trainer',
        include: [{ model: Unit, as: 'unit' }]
      }]
    });
    if (!report) return res.status(404).json({ error: 'Not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const report = await TrainingReport.create(req.body);
    const fullReport = await TrainingReport.findByPk(report.id, {
      include: [{
        model: Personnel,
        as: 'trainer',
        include: [{ model: Unit, as: 'unit' }]
      }]
    });
    res.status(201).json(fullReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const report = await TrainingReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });
    
    await report.update(req.body);
    const updated = await TrainingReport.findByPk(report.id, {
      include: [{
        model: Personnel,
        as: 'trainer',
        include: [{ model: Unit, as: 'unit' }]
      }]
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const report = await TrainingReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });
    
    await report.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await TrainingReport.findAll({
      attributes: [
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'total'],
        [require('sequelize').fn('SUM', require('sequelize').col('training_hours')), 'totalHours'],
        [require('sequelize').fn('DATE_FORMAT', require('sequelize').col('training_time'), '%Y-%m'), 'month']
      ],
      group: [require('sequelize').fn('DATE_FORMAT', require('sequelize').col('training_time'), '%Y-%m')],
      raw: true,
      order: [[require('sequelize').fn('DATE_FORMAT', require('sequelize').col('training_time'), '%Y-%m'), 'DESC']]
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
