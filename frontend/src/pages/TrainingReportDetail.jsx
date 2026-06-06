import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trainingReportsAPI, personnelAPI } from '../services/api';
import { formatDateTime } from '../utils/dateUtils';

export default function TrainingReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reportRes, personnelRes] = await Promise.all([
        trainingReportsAPI.getById(id),
        personnelAPI.getAll(1, 1000)
      ]);
      setReport(reportRes.data);
      setPersonnel(personnelRes.data.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const getTrainerInfo = (trainerId) => {
    if (!trainerId) return '---';
    const trainer = personnel.find(p => p.id === parseInt(trainerId));
    return trainer ? `${trainer.rank} ${trainer.full_name}` : '---';
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
          <h1 className="text-3xl font-bold text-gray-800">Chi tiết báo cáo huấn luyện #{report.id}</h1>
          <p className="text-gray-600 mt-1">Xem chi tiết nội dung huấn luyện</p>
        </div>
        <button
          onClick={() => navigate('/training-reports')}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          ← Quay lại
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Vấn đề</label>
              <p className="text-lg text-gray-900 font-semibold">{report.training_topic}</p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Thời gian</label>
              <p className="text-lg text-gray-900 font-semibold">{formatDateTime(report.training_time)}</p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Số giờ huấn luyện</label>
              <p className="text-lg text-gray-900 font-semibold">{report.training_hours} giờ</p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Người huấn luyện</label>
              <p className="text-lg text-gray-900 font-semibold">{getTrainerInfo(report.trainer_id)}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Nội dung huấn luyện</label>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {report.training_content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
