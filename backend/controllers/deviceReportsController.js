const DeviceReport = require('../models/DeviceReport');
const Unit = require('../models/Unit');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, unitId } = req.query;
    const offset = (page - 1) * limit;

    let where = {};
    if (status) where.status = status;
    if (unitId) where.unit_id = unitId;

    const { count, rows } = await DeviceReport.findAndCountAll({
      where,
      include: [{ model: Unit, as: 'unit' }],
      offset,
      limit: parseInt(limit),
      order: [['disconnect_time', 'DESC']]
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
    const report = await DeviceReport.findByPk(req.params.id, {
      include: [{ model: Unit, as: 'unit' }]
    });
    if (!report) return res.status(404).json({ error: 'Not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const report = await DeviceReport.create(req.body);
    const fullReport = await DeviceReport.findByPk(report.id, {
      include: [{ model: Unit, as: 'unit' }]
    });
    res.status(201).json(fullReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const report = await DeviceReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });

    await report.update(req.body);
    const updated = await DeviceReport.findByPk(report.id, {
      include: [{ model: Unit, as: 'unit' }]
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const report = await DeviceReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });

    await report.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = {
      total_errors: await DeviceReport.count(),
      processing: await DeviceReport.count({ where: { status: 'processing' } }),
      resolved: await DeviceReport.count({ where: { status: 'resolved' } }),
      by_unit: await DeviceReport.findAll({
        attributes: [
          'unit_id',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        include: [{ model: Unit, as: 'unit', attributes: ['id', 'unit_name'] }],
        group: ['unit_id'],
        raw: true,
        subQuery: false
      })
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
