import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { unitsAPI } from '../services/api';

export default function Units() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    unit_name: '',
    parent_unit: '',
    total_devices: 0,
    description: ''
  });

  useEffect(() => {
    loadData();
  }, [search]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await unitsAPI.getAll(search);
      setData(response.data);
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
      unit_name: '',
      parent_unit: '',
      total_devices: 0,
      description: ''
    });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await unitsAPI.delete(id);
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
        await unitsAPI.update(editingId, formData);
        alert('Cập nhật thành công');
      } else {
        await unitsAPI.create(formData);
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
          <h1 className="text-3xl font-bold text-gray-800">Danh sách đơn vị</h1>
          <p className="text-gray-600 mt-1">Quản lý các đơn vị quân sự</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium"
        >
          ➕ Thêm mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn vị..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="text-center py-12 col-span-full">Đang tải...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-gray-500 col-span-full">Không có dữ liệu</div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-800">{item.unit_name}</h3>
              <p className="text-sm text-gray-600 mt-1">Đơn vị cấp trên: {item.parent_unit || 'N/A'}</p>
              <p className="text-sm text-gray-600">Thiết bị: {item.total_devices}</p>
              {item.description && <p className="text-sm text-gray-500 mt-2">{item.description}</p>}
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Chỉnh sửa đơn vị' : 'Thêm đơn vị'}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên đơn vị</label>
            <input
              type="text"
              value={formData.unit_name}
              onChange={(e) => setFormData({ ...formData, unit_name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Đơn vị cấp trên</label>
            <input
              type="text"
              value={formData.parent_unit}
              onChange={(e) => setFormData({ ...formData, parent_unit: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tổng số thiết bị</label>
            <input
              type="number"
              value={formData.total_devices}
              onChange={(e) => setFormData({ ...formData, total_devices: parseInt(e.target.value) })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
