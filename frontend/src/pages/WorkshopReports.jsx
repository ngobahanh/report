import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { workshopReportsAPI, personnelAPI } from '../services/api';
import { formatDateTime } from '../utils/dateUtils';

export default function WorkshopReports() {
  const [data, setData] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    training_content: '',
    training_time: '',
    executor_id: ''
  });

  useEffect(() => {
    loadPersonnel();
    loadData();
  }, [page]);

  const loadPersonnel = async () => {
    try {
      const response = await personnelAPI.getAll(1, 1000);
      setPersonnel(response.data.data);
    } catch (error) {
      console.error('Error loading personnel:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await workshopReportsAPI.getAll(page);
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
      training_content: '',
      training_time: '',
      executor_id: ''
    });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      training_content: item.training_content,
      training_time: item.training_time.split('.')[0],
      executor_id: item.executor_id
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await workshopReportsAPI.delete(id);
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
        await workshopReportsAPI.update(editingId, formData);
        alert('Cập nhật thành công');
      } else {
        await workshopReportsAPI.create(formData);
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
          <h1 className="text-3xl font-bold text-gray-800">Báo cáo tập huấn</h1>
          <p className="text-gray-600 mt-1">Quản lý báo cáo tập huấn</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium"
        >
          ➕ Thêm mới
        </button>
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nội dung</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời gian</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Người thực hiện</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.training_content.substring(0, 40)}...</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDateTime(item.training_time)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.executor?.full_name}</td>
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
            <label className="block text-sm font-medium text-gray-700">Nội dung tập huấn</label>
            <textarea
              value={formData.training_content}
              onChange={(e) => setFormData({ ...formData, training_content: e.target.value })}
              rows="3"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Thời gian</label>
            <input
              type="datetime-local"
              value={formData.training_time}
              onChange={(e) => setFormData({ ...formData, training_time: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Người thực hiện</label>
            <select
              value={formData.executor_id}
              onChange={(e) => setFormData({ ...formData, executor_id: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Chọn người</option>
              {personnel.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.rank} {p.full_name} - {p.position}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
