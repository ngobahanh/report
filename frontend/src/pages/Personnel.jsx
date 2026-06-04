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
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    rank: '',
    position: '',
    birth_date: '',
    hometown: '',
    unit_id: '',
    work_history: '',
    father_name: '',
    mother_name: '',
    spouse_name: '',
    children: ''
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
      unit_id: '',
      work_history: '',
      father_name: '',
      mother_name: '',
      spouse_name: '',
      children: ''
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
      unit_id: item.unit_id || '',
      work_history: item.work_history || '',
      father_name: item.father_name || '',
      mother_name: item.mother_name || '',
      spouse_name: item.spouse_name || '',
      children: item.children || ''
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quá trình công tác</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thông tin gia đình</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-primary cursor-pointer hover:underline" onClick={() => { setDetailItem(item); setDetailOpen(true); }}>{item.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.rank}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.position}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(item.birth_date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.hometown}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.unit?.unit_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={item.work_history}>{item.work_history || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={`Cha: ${item.father_name}, Mẹ: ${item.mother_name}, Vợ/Chồng: ${item.spouse_name}, Con em: ${item.children}`}>
                        {item.father_name || item.mother_name || item.spouse_name || item.children ? 'Xem chi tiết' : '-'}
                      </td>
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

      {/* Detail Modal */}
      {detailOpen && detailItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-red-700 px-8 py-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{detailItem.full_name}</h2>
              <button onClick={() => setDetailOpen(false)} className="text-white text-3xl hover:opacity-80 leading-none">✕</button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Cấp bậc</p>
                  <p className="text-sm font-medium text-gray-900">{detailItem.rank || '-'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Chức vụ</p>
                  <p className="text-sm font-medium text-gray-900">{detailItem.position || '-'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Ngày sinh</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(detailItem.birth_date) || '-'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Quê quán</p>
                  <p className="text-sm font-medium text-gray-900">{detailItem.hometown || '-'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Đơn vị</p>
                  <p className="text-sm font-medium text-gray-900">{detailItem.unit?.unit_name || '-'}</p>
                </div>
              </div>
              <div className="border-t pt-6">
                <p className="text-sm font-semibold text-gray-700 uppercase mb-3">📋 Quá trình công tác</p>
                <p className="text-base text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded leading-relaxed">{detailItem.work_history || '-'}</p>
              </div>
              <div className="border-t pt-6">
                <p className="text-sm font-semibold text-gray-700 uppercase mb-4">👨‍👩‍👧‍👦 Thông tin gia đình</p>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                    <p className="text-xs font-semibold text-blue-700 uppercase">👨 Cha</p>
                    <p className="text-sm text-gray-900 mt-2">{detailItem.father_name || '-'}</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded border-l-4 border-pink-400">
                    <p className="text-xs font-semibold text-pink-700 uppercase">👩 Mẹ</p>
                    <p className="text-sm text-gray-900 mt-2">{detailItem.mother_name || '-'}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-400">
                    <p className="text-xs font-semibold text-purple-700 uppercase">💑 Vợ/Chồng</p>
                    <p className="text-sm text-gray-900 mt-2">{detailItem.spouse_name || '-'}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
                    <p className="text-xs font-semibold text-green-700 uppercase">👧 Con em</p>
                    <p className="text-sm text-gray-900 mt-2">{detailItem.children || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-8 py-4 flex justify-end space-x-3 border-t">
              <button onClick={() => setDetailOpen(false)} className="px-6 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 font-medium transition-colors">Đóng</button>
              <button onClick={() => { setDetailOpen(false); handleEdit(detailItem); }} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark font-medium transition-colors">✏️ Sửa thông tin</button>
            </div>
          </div>
        </div>
      )}

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

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quá trình công tác</h3>
            <textarea
              value={formData.work_history}
              onChange={(e) => setFormData({ ...formData, work_history: e.target.value })}
              placeholder="VD: 2020-2022: Phòng quân sự, 2022-nay: Bộ chỉ huy..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Thông tin gia đình</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">Tên cha</label>
                <input
                  type="text"
                  value={formData.father_name}
                  onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Tên mẹ</label>
                <input
                  type="text"
                  value={formData.mother_name}
                  onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Vợ/Chồng</label>
                <input
                  type="text"
                  value={formData.spouse_name}
                  onChange={(e) => setFormData({ ...formData, spouse_name: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Con em</label>
                <input
                  type="text"
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                  placeholder="VD: Con trai (12t), con gái (8t)"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
