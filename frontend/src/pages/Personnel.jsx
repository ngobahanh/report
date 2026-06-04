import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { personnelAPI, unitsAPI } from '../services/api';
import { formatDate } from '../utils/dateUtils';

export default function Personnel() {
  const [data, setData] = useState([]);
  const [units, setUnits] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    rank: '',
    position: '',
    birth_date: '',
    hometown: '',
    unit_id: ''
  });

  useEffect(() => {
    loadUnits();
    loadData();
  }, [page, search]);

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
      const response = await personnelAPI.getAll(page, 10, search);
      setData(response.data.data);
      setTotal(response.data.total);
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
      full_name: '',
      rank: '',
      position: '',
      birth_date: '',
      hometown: '',
      unit_id: ''
    });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      full_name: item.full_name,
      rank: item.rank,
      position: item.position,
      birth_date: item.birth_date ? item.birth_date.split('T')[0] : '',
      hometown: item.hometown || '',
      unit_id: item.unit_id || ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await personnelAPI.delete(id);
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
        await personnelAPI.update(editingId, formData);
        alert('Cập nhật thành công');
      } else {
        await personnelAPI.create(formData);
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
          <h1 className="text-3xl font-bold text-gray-800">Thông tin cá nhân</h1>
          <p className="text-gray-600 mt-1">Quản lý danh sách nhân sự</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-medium"
        >
          ➕ Thêm mới
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, cấp bậc, chức vụ..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        />
      </div>

      {/* Table */}
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Họ tên</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cấp bậc</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Chức vụ</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày sinh</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quê quán</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Đơn vị</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.rank}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.position}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(item.birth_date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.hometown}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.unit?.unit_name}</td>
                      <td className="px-6 py-4 text-right text-sm space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          🗑️ Xóa
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

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Chỉnh sửa nhân sự' : 'Thêm nhân sự'}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cấp bậc</label>
              <input
                type="text"
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Chức vụ</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quê quán</label>
              <input
                type="text"
                value={formData.hometown}
                onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
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
        </div>
      </Modal>
    </div>
  );
}
