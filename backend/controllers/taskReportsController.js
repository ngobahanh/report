const TaskReport = require('../models/TaskReport');
const TaskDetail = require('../models/TaskDetail');
const Personnel = require('../models/Personnel');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;
    const offset = (page - 1) * limit;

    let where = {};
    if (startDate && endDate) {
      where.report_time = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const { count, rows } = await TaskReport.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      order: [['report_time', 'DESC']]
    });

    // Get task details for each report with responsible person info
    for (let report of rows) {
      report.dataValues.tasks = await TaskDetail.findAll({
        where: { task_report_id: report.id },
        include: [
          {
            model: Personnel,
            as: 'responsible',
            attributes: ['id', 'full_name', 'rank', 'position']
          }
        ]
      });
    }

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
    const report = await TaskReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });

    const tasks = await TaskDetail.findAll({
      where: { task_report_id: report.id },
      include: [
        {
          model: Personnel,
          as: 'responsible',
          attributes: ['id', 'full_name', 'rank', 'position']
        }
      ]
    });
    report.dataValues.tasks = tasks;

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { tasks, ...reportData } = req.body;
    const report = await TaskReport.create(reportData);

    if (tasks && tasks.length > 0) {
      for (let task of tasks) {
        await TaskDetail.create({
          task_report_id: report.id,
          ...task
        });
      }
    }

    const fullReport = await TaskReport.findByPk(report.id);
    const taskDetails = await TaskDetail.findAll({
      where: { task_report_id: report.id },
      include: [
        {
          model: Personnel,
          as: 'responsible',
          attributes: ['id', 'full_name', 'rank', 'position']
        }
      ]
    });
    fullReport.dataValues.tasks = taskDetails;

    res.status(201).json(fullReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { tasks, ...reportData } = req.body;
    const report = await TaskReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });

    await report.update(reportData);

    if (tasks) {
      await TaskDetail.destroy({ where: { task_report_id: report.id } });
      for (let task of tasks) {
        await TaskDetail.create({
          task_report_id: report.id,
          ...task
        });
      }
    }

    const taskDetails = await TaskDetail.findAll({
      where: { task_report_id: report.id },
      include: [
        {
          model: Personnel,
          as: 'responsible',
          attributes: ['id', 'full_name', 'rank', 'position']
        }
      ]
    });
    report.dataValues.tasks = taskDetails;

    res.json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const report = await TaskReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });

    await TaskDetail.destroy({ where: { task_report_id: report.id } });
    await report.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
