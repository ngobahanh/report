const Personnel = require('../models/Personnel');
const Unit = require('../models/Unit');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', unitId } = req.query;
    const offset = (page - 1) * limit;
    
    let where = {};
    if (search) {
      where[Op.or] = [
        { full_name: { [Op.like]: `%${search}%` } },
        { rank: { [Op.like]: `%${search}%` } },
        { position: { [Op.like]: `%${search}%` } }
      ];
    }
    if (unitId) {
      where.unit_id = unitId;
    }

    const { count, rows } = await Personnel.findAndCountAll({
      where,
      include: [{ model: Unit, as: 'unit' }],
      offset,
      limit: parseInt(limit),
      order: [['id', 'DESC']]
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
    const personnel = await Personnel.findByPk(req.params.id, {
      include: [{ model: Unit, as: 'unit' }]
    });
    if (!personnel) return res.status(404).json({ error: 'Not found' });
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const personnel = await Personnel.create(req.body);
    res.status(201).json(personnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const personnel = await Personnel.findByPk(req.params.id);
    if (!personnel) return res.status(404).json({ error: 'Not found' });
    
    await personnel.update(req.body);
    res.json(personnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const personnel = await Personnel.findByPk(req.params.id);
    if (!personnel) return res.status(404).json({ error: 'Not found' });
    
    await personnel.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByUnit = async (req, res) => {
  try {
    const { unitId } = req.params;
    const personnel = await Personnel.findAll({
      where: { unit_id: unitId },
      include: [{ model: Unit, as: 'unit' }]
    });
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
