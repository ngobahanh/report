import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deviceReportsAPI, unitsAPI } from '../services/api';
import { formatDateTime } from '../utils/dateUtils';
import { statusColors, statusLabels } from '../utils/constants';

export default function DeviceReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reportRes, unitsRes] = await Promise.all([
        deviceReportsAPI.getById(id),
        unitsAPI.getAll()
      ]);
      setReport(reportRes.data);
      setUnits(unitsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const getUnitName = (unitId) => {
    if (!unitId) return '---';
    const unit = units.find(u => u.id === parseInt(unitId));
    return unit ? unit.name : '---';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">Không tìm thấy báo cáo</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Chi tiết báo cáo thiết bị #{report.id}</h1>
          <p className="text-gray-600 mt-1">Xem chi tiết tình trạng thiết bị</p>
        </div>
        <button
          onClick={() => navigate('/device-reports')}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          ← Quay lại
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Đơn vị</label>
              <p className="text-lg text-gray-900 font-semibold">{getUnitName(report.unit_id)}</p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Tên thiết bị</label>
              <p className="text-lg text-gray-900 font-semibold">{report.device_name}</p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Trạng thái</label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[report.status] || 'bg-gray-100'}`}>
                {statusLabels[report.status] || report.status}
              </span>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Thời gian mất kết nối</label>
              <p className="text-gray-900">{formatDateTime(report.disconnect_time)}</p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Thời gian khắc phục</label>
              <p className="text-gray-900">
                {report.resolve_time ? formatDateTime(report.resolve_time) : '---'}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Nguyên nhân</label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{report.cause || '---'}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Giải pháp</label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{report.solution || '---'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
