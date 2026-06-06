import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskReportsAPI, personnelAPI } from '../services/api';

export default function TaskReportDetail() {
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
        taskReportsAPI.getById(id),
        personnelAPI.getAll(1, 1000)
      ]);
      setReport(reportRes.data);
      setPersonnel(personnelRes.data.data || personnelRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const getPersonnelName = (responsibleId) => {
    if (!responsibleId) return '---';
    const person = personnel.find(p => p.id === parseInt(responsibleId));
    return person ? `${person.rank} ${person.full_name}` : '---';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pending': 'Chờ',
      'in_progress': 'Đang',
      'completed': 'Xong',
      'on_hold': 'Tạm'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'on_hold': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
          <h1 className="text-3xl font-bold text-gray-800">Chi tiết báo cáo nhiệm vụ #{report.id}</h1>
          <p className="text-gray-600 mt-1">Xem chi tiết toàn bộ nhiệm vụ</p>
        </div>
        <button
          onClick={() => navigate('/task-reports')}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          ← Quay lại
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh sách nhiệm vụ</h2>

          {report.tasks && report.tasks.length > 0 ? (
            <div className="space-y-4">
              {report.tasks.map((task, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Tên nhiệm vụ</label>
                      <p className="text-lg text-gray-900 font-semibold">{task.task_name}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Tiến độ</label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${task.progress_percent || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-lg font-semibold text-primary w-12 text-right">
                          {task.progress_percent || 0}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                        {getStatusLabel(task.status)}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Người phụ trách</label>
                      <p className="text-gray-900">{getPersonnelName(task.responsible_id)}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Hạn hoàn thành</label>
                      <p className="text-gray-900">
                        {task.due_date ? new Date(task.due_date).toLocaleDateString('vi-VN') : '---'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Không có nhiệm vụ nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
