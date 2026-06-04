const Personnel = require('../models/Personnel');
const Unit = require('../models/Unit');
const TrainingReport = require('../models/TrainingReport');
const DeviceReport = require('../models/DeviceReport');
const TaskReport = require('../models/TaskReport');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPersonnel = await Personnel.count();
    const totalUnits = await Unit.count();
    const totalDevices = await Unit.sum('total_devices') || 0;
    const deviceErrors = await DeviceReport.count({ where: { status: 'processing' } });
    
    // Reports this month
    const monthStart = new Date();
    monthStart.setDate(1);
    const monthEnd = new Date();
    
    const monthReports = await TrainingReport.count({
      where: {
        training_time: {
          [require('sequelize').Op.between]: [monthStart, monthEnd]
        }
      }
    });

    res.json({
      totalPersonnel,
      totalUnits,
      totalDevices,
      deviceErrors,
      monthReports
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChartsData = async (req, res) => {
  try {
    // Training by month
    const trainingByMonth = await TrainingReport.findAll({
      attributes: [
        [require('sequelize').fn('DATE_FORMAT', require('sequelize').col('training_time'), '%Y-%m'), 'month'],
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: [require('sequelize').fn('DATE_FORMAT', require('sequelize').col('training_time'), '%Y-%m')],
      raw: true,
      order: [[require('sequelize').fn('DATE_FORMAT', require('sequelize').col('training_time'), '%Y-%m'), 'DESC']],
      limit: 12
    });

    // Device status
    const deviceStatus = await DeviceReport.findAll({
      attributes: [
        'status',
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });

    // Task progress - aggregate
    const taskProgress = {
      pending: 0,
      in_progress: 0,
      completed: 0,
      on_hold: 0
    };

    res.json({
      trainingByMonth,
      deviceStatus,
      taskProgress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
