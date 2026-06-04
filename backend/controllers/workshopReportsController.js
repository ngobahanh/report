const WorkshopReport = require('../models/WorkshopReport');
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

    const { count, rows } = await WorkshopReport.findAndCountAll({
      where,
      include: [{
        model: Personnel,
        as: 'executor',
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
    const report = await WorkshopReport.findByPk(req.params.id, {
      include: [{
        model: Personnel,
        as: 'executor',
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
    const report = await WorkshopReport.create(req.body);
    const fullReport = await WorkshopReport.findByPk(report.id, {
      include: [{
        model: Personnel,
        as: 'executor',
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
    const report = await WorkshopReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });
    
    await report.update(req.body);
    const updated = await WorkshopReport.findByPk(report.id, {
      include: [{
        model: Personnel,
        as: 'executor',
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
    const report = await WorkshopReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });
    
    await report.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
