import React, { useState } from 'react';
import { exportAPI } from '../services/api';

export default function ExportReports() {
  const [reportType, setReportType] = useState('training');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState('excel');

  const handleExport = async () => {
    if (!startDate || !endDate) {
      alert('Vui lòng chọn khoảng thời gian');
      return;
    }

    if (format === 'excel') {
      exportAPI.exportToExcel(reportType, startDate, endDate);
    } else {
      exportAPI.exportToPDF(reportType, startDate, endDate);
    }

    alert(`Báo cáo được tải xuống thành công!`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Xuất báo cáo</h1>
        <p className="text-gray-600 mt-1">Xuất báo cáo Excel/PDF</p>
      </div>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Loại báo cáo</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-lg"
            >
              <option value="training">Báo cáo huấn luyện</option>
              <option value="workshop">Báo cáo tập huấn</option>
              <option value="task">Báo cáo nhiệm vụ</option>
              <option value="device">Báo cáo thiết bị</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Từ ngày</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Đến ngày</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Định dạng</label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="excel"
                  checked={format === 'excel'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mr-2"
                />
                <span className="text-lg">📊 Excel</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="pdf"
                  checked={format === 'pdf'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mr-2"
                />
                <span className="text-lg">📄 PDF</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="w-full px-6 py-4 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-semibold text-lg"
          >
            📥 Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          💡 <strong>Hướng dẫn:</strong> Chọn loại báo cáo, khoảng thời gian và định dạng file, sau đó nhấn "Xuất báo cáo" để tải xuống.
        </p>
      </div>
    </div>
  );
}
