const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const TrainingReport = require('../models/TrainingReport');
const WorkshopReport = require('../models/WorkshopReport');
const TaskReport = require('../models/TaskReport');
const DeviceReport = require('../models/DeviceReport');
const Personnel = require('../models/Personnel');

exports.exportToExcel = async (req, res) => {
  try {
    const { reportType, startDate, endDate, unitId } = req.query;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    // Style header
    const headerFill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFC62828' }
    };
    const headerFont = {
      bold: true,
      color: { argb: 'FFFFFFFF' }
    };

    if (reportType === 'training') {
      let query = {};
      if (startDate && endDate) {
        query.training_time = {
          [require('sequelize').Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }
      const reports = await TrainingReport.findAll({
        where: query,
        include: [{ model: Personnel, as: 'trainer' }]
      });

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nội dung', key: 'training_content', width: 30 },
        { header: 'Vấn đề', key: 'training_topic', width: 20 },
        { header: 'Thời gian', key: 'training_time', width: 20 },
        { header: 'Số giờ', key: 'training_hours', width: 15 },
        { header: 'Người huấn luyện', key: 'trainer_name', width: 20 }
      ];

      worksheet.getRow(1).fill = headerFill;
      worksheet.getRow(1).font = headerFont;

      reports.forEach(report => {
        worksheet.addRow({
          id: report.id,
          training_content: report.training_content,
          training_topic: report.training_topic,
          training_time: report.training_time,
          training_hours: report.training_hours,
          trainer_name: report.trainer?.full_name || ''
        });
      });
    } else if (reportType === 'device') {
      let query = {};
      if (startDate && endDate) {
        query.disconnect_time = {
          [require('sequelize').Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }
      const reports = await DeviceReport.findAll({ where: query });

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Thiết bị', key: 'device_name', width: 20 },
        { header: 'Thời gian mất', key: 'disconnect_time', width: 20 },
        { header: 'Thời gian khôi phục', key: 'resolve_time', width: 20 },
        { header: 'Nguyên nhân', key: 'cause', width: 30 },
        { header: 'Giải pháp', key: 'solution', width: 30 },
        { header: 'Trạng thái', key: 'status', width: 15 }
      ];

      worksheet.getRow(1).fill = headerFill;
      worksheet.getRow(1).font = headerFont;

      reports.forEach(report => {
        worksheet.addRow({
          id: report.id,
          device_name: report.device_name,
          disconnect_time: report.disconnect_time,
          resolve_time: report.resolve_time,
          cause: report.cause,
          solution: report.solution,
          status: report.status
        });
      });
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportToPDF = async (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.query;

    const doc = new PDFDocument();
    doc.fontSize(18).text('HỆ THỐNG TỔNG HỢP BÁO CÁO', { align: 'center' });
    doc.fontSize(12).text(`Loại báo cáo: ${reportType}`, { align: 'center' });
    doc.moveDown();

    if (reportType === 'training') {
      let query = {};
      if (startDate && endDate) {
        query.training_time = {
          [require('sequelize').Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }
      const reports = await TrainingReport.findAll({
        where: query,
        include: [{ model: Personnel, as: 'trainer' }]
      });

      reports.forEach((report, index) => {
        doc.fontSize(11).text(`Báo cáo #${report.id}`, { underline: true });
        doc.fontSize(10).text(`Nội dung: ${report.training_content}`);
        doc.text(`Vấn đề: ${report.training_topic}`);
        doc.text(`Thời gian: ${report.training_time}`);
        doc.text(`Số giờ: ${report.training_hours}`);
        doc.text(`Người huấn luyện: ${report.trainer?.full_name || ''}`);
        doc.moveDown();
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');

    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
