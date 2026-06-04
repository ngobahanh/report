import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { unitsAPI } from '../services/api';

export default function Units() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [formData, setFormData] = useState({
    unit_name: '',
    parent_id: '',
    level: 0,
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
      level: 0,
      parent_id: '',
      total_devices: 0,
      description: ''
    });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      unit_name: item.unit_name,
      level: item.level || 0,
      parent_id: item.parent_id || '',
      total_devices: item.total_devices || 0,
      description: item.description || ''
    });
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

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const getLevelLabel = (level) => {
    const labels = ['Cấp 1 (Cao nhất)', 'Cấp 2', 'Cấp 3', 'Cấp 4', 'Cấp 5'];
    return labels[level] || `Cấp ${level + 1}`;
  };

  const TreeNode = ({ node, parentId = null }) => {
    const isExpanded = expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="mb-2">
        <div
          className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          style={{ marginLeft: `${(node.level || 0) * 30}px` }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {hasChildren ? (
                <button
                  onClick={() => toggleExpanded(node.id)}
                  className="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-gray-100 rounded"
                >
                  {isExpanded ? '▼' : '▶'}
                </button>
              ) : (
                <div className="w-6"></div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800">{node.unit_name}</h4>
                  <span className="px-2 py-1 bg-primary text-white text-xs rounded-full font-medium">
                    {getLevelLabel(node.level || 0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  🖥️ {node.total_devices} thiết bị {node.description && `• ${node.description}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => handleEdit(node)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition-colors"
            >
              ✏️
            </button>
            <button
              onClick={() => handleDelete(node.id)}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-medium transition-colors"
            >
              🗑️
            </button>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="mt-1">
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} parentId={node.id} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const rootUnits = search ? data : data.filter(unit => !unit.parent_id || unit.level === 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Danh sách đơn vị</h1>
          <p className="text-gray-600 mt-1">Quản lý các đơn vị quân sự theo cơ cấu cây</p>
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

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-center py-12">Đang tải...</div>
        ) : rootUnits.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Không có dữ liệu</div>
        ) : (
          <div className="space-y-2">
            {rootUnits.map((unit) => (
              <TreeNode key={unit.id} node={unit} />
            ))}
          </div>
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
            /> className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Đơn vị cấp trên (Chọn từ danh sách)</label>
              <select
                value={formData.parent_id}
                onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Không có (Đơn vị cấp cao nhất)</option>
                {data.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.unit_name} - {getLevelLabel(unit.level || 0)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cấp độ</label>
              <input
                type="number"
                min="0"
                max="5"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 0 })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tổng số thiết bị</label>
            <input
              type="number"
              value={formData.total_devices}
              onChange={(e) => setFormData({ ...formData, total_devices: parseInt(e.target.value) || 0 })}
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
