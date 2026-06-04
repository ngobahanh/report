const Unit = require('../models/Unit');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { search = '' } = req.query;
    let where = {};
    if (search) {
      where[Op.or] = [
        { unit_name: { [Op.like]: `%${search}%` } },
        { parent_unit: { [Op.like]: `%${search}%` } }
      ];
    }

    // Get all units with their children (for tree structure)
    const units = await Unit.findAll({
      where,
      include: [
        {
          association: 'children',
          include: [
            {
              association: 'children',
              attributes: ['id', 'unit_name', 'parent_id', 'level', 'total_devices', 'description']
            }
          ],
          attributes: ['id', 'unit_name', 'parent_id', 'level', 'total_devices', 'description']
        }
      ],
      order: [['level', 'ASC'], ['unit_name', 'ASC']],
      attributes: ['id', 'unit_name', 'parent_unit', 'parent_id', 'level', 'total_devices', 'description']
    });
    res.json(units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id, {
      include: [
        {
          association: 'parent',
          attributes: ['id', 'unit_name', 'level']
        },
        {
          association: 'children',
          attributes: ['id', 'unit_name', 'level', 'total_devices']
        }
      ]
    });
    if (!unit) return res.status(404).json({ error: 'Not found' });
    res.json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to calculate level
const calculateLevel = async (parentId) => {
  if (!parentId) return 0;
  const parent = await Unit.findByPk(parentId);
  return parent ? parent.level + 1 : 0;
};

exports.create = async (req, res) => {
  try {
    // If level is not provided, calculate it based on parent_id
    if (req.body.level === undefined || req.body.level === null) {
      if (req.body.parent_id) {
        req.body.level = await calculateLevel(req.body.parent_id);
      } else {
        req.body.level = 0;
      }
    }
    
    const unit = await Unit.create(req.body);
    res.status(201).json(unit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ error: 'Not found' });
    
    // If level is not provided in request, calculate it based on parent_id if parent_id is changing
    if (req.body.level === undefined || req.body.level === null) {
      if (req.body.parent_id !== undefined && req.body.parent_id !== unit.parent_id) {
        req.body.level = await calculateLevel(req.body.parent_id);
      }
      // If level is not provided and parent_id is not changing, keep the existing level
    }
    
    await unit.update(req.body);
    res.json(unit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    if (!unit) return res.status(404).json({ error: 'Not found' });
    
    await unit.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
