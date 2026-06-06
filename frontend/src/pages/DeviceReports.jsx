import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { deviceReportsAPI, unitsAPI } from '../services/api';
import { formatDateTime, formatDate } from '../utils/dateUtils';
import { statusColors, statusLabels } from '../utils/constants';

export default function DeviceReports() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    unit_id: '',
    device_name: '',
    disconnect_time: '',
    resolve_time: '',
    cause: '',
    solution: '',
    status: 'processing'
  });

  useEffect(() => {
    loadUnits();
    loadData();
  }, [page, status]);

  const loadUnits = async () => {
    try {
      const response = await unitsAPI.getAll();
      setUnits(response.data);
    } catch (error) {
      console.error('Error loading units:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await deviceReportsAPI.getAll(page, 10, status || null);
      setData(response.data.data);
      setPages(response.data.pages);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      unit_id: '',
      device_name: '',
      disconnect_time: '',
      resolve_time: '',
      cause: '',
      solution: '',
      status: 'processing'
    });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      unit_id: item.unit_id,
      device_name: item.device_name,
      disconnect_time: item.disconnect_time.split('.')[0],
      resolve_time: item.resolve_time ? item.resolve_time.split('.')[0] : '',
      cause: item.cause,
      solution: item.solution || '',
      status: item.status
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await deviceReportsAPI.delete(id);
        alert('Xóa thành công');
        loadData();
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Lỗi khi xóa');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await deviceReportsAPI.update(editingId, formData);
        alert('Cập nhật thành công');
      } else {
        await deviceReportsAPI.create(formData);
        alert('Thêm mới thành công');
      }
      setModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Lỗi khi lưu dữ liệu');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Thiết bị mất kết nối</h1>
          <p className="text-gray-600 mt-1">Quản lý báo cáo thiết bị/máy chủ mất kết nối</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium"
        >
          ➕ Thêm mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 flex gap-4">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="processing">Đang xử lý</option>
          <option value="resolved">Đã xử lý</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-12">Đang tải...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Không có dữ liệu</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thiết bị</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Đơn vị</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời gian mất</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời gian khôi phục</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/device-reports/${item.id}`)}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.device_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.unit?.unit_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDateTime(item.disconnect_time)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDateTime(item.resolve_time) || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                          {statusLabels[item.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Chỉnh sửa báo cáo' : 'Thêm báo cáo'}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Đơn vị</label>
            <select
              value={formData.unit_id}
              onChange={(e) => setFormData({ ...formData, unit_id: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Chọn đơn vị</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.unit_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên thiết bị</label>
            <input
              type="text"
              value={formData.device_name}
              onChange={(e) => setFormData({ ...formData, device_name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Thời gian mất</label>
              <input
                type="datetime-local"
                value={formData.disconnect_time}
                onChange={(e) => setFormData({ ...formData, disconnect_time: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Thời gian khôi phục</label>
              <input
                type="datetime-local"
                value={formData.resolve_time}
                onChange={(e) => setFormData({ ...formData, resolve_time: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nguyên nhân</label>
            <textarea
              value={formData.cause}
              onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
              rows="2"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giải pháp</label>
            <textarea
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              rows="2"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="processing">Đang xử lý</option>
              <option value="resolved">Đã xử lý</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
