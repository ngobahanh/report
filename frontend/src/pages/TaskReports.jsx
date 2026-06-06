import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { taskReportsAPI, personnelAPI } from '../services/api';
import { formatDateTime, formatDate } from '../utils/dateUtils';

export default function TaskReports() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [personnel, setPersonnel] = useState([]);
  const [taskRows, setTaskRows] = useState([{ task_name: '', progress_percent: 0, status: 'pending', responsible_id: '', due_date: '' }]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadPersonnel();
    loadData();
  }, [page]);

  const loadPersonnel = async () => {
    try {
      const response = await personnelAPI.getAll(1, 1000);
      setPersonnel(response.data.data || response.data);
    } catch (error) {
      console.error('Error loading personnel:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await taskReportsAPI.getAll(page);
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
    setTaskRows([{ task_name: '', progress_percent: 0, status: 'pending', responsible_id: '', due_date: '' }]);
    setFormData({});
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTaskRows(item.tasks || []);
    setFormData({});
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await taskReportsAPI.delete(id);
        alert('Xóa thành công');
        loadData();
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Lỗi khi xóa');
      }
    }
  };

  const handleAddTask = () => {
    setTaskRows([...taskRows, { task_name: '', progress_percent: 0, status: 'pending', responsible_id: '', due_date: '' }]);
  };

  const handleUpdateTask = (index, field, value) => {
    const updated = [...taskRows];
    updated[index][field] = value;
    setTaskRows(updated);
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        tasks: taskRows
      };

      if (editingId) {
        await taskReportsAPI.update(editingId, submitData);
        alert('Cập nhật thành công');
      } else {
        await taskReportsAPI.create(submitData);
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
          <h1 className="text-3xl font-bold text-gray-800">Báo cáo nhiệm vụ</h1>
          <p className="text-gray-600 mt-1">Quản lý báo cáo thực hiện nhiệm vụ</p>
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
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Báo cáo</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/task-reports/${item.id}`)}>
                      <td className="px-6 py-4 text-sm text-gray-600">Báo cáo #{item.id}</td>
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
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">Danh sách nhiệm vụ</label>
              <button
                onClick={handleAddTask}
                className="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-primaryDark"
              >
                + Thêm
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {taskRows.map((task, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tên nhiệm vụ"
                    value={task.task_name}
                    onChange={(e) => handleUpdateTask(index, 'task_name', e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="%"
                    value={task.progress_percent}
                    onChange={(e) => handleUpdateTask(index, 'progress_percent', e.target.value)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateTask(index, 'status', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="pending">Chờ</option>
                    <option value="in_progress">Đang</option>
                    <option value="completed">Xong</option>
                    <option value="on_hold">Tạm</option>
                  </select>
                  <select
                    value={task.responsible_id || ''}
                    onChange={(e) => handleUpdateTask(index, 'responsible_id', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm max-w-xs"
                    title="Người phụ trách"
                  >
                    <option value="">---</option>
                    {personnel.map((p) => (
                      <option key={p.id} value={p.id}>{p.full_name}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={task.due_date || ''}
                    onChange={(e) => handleUpdateTask(index, 'due_date', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
