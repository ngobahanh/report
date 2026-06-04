import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'Thông tin cá nhân', path: '/personnel', icon: '👤' },
    { label: 'Danh sách đơn vị', path: '/units', icon: '🏢' },
    { label: 'Báo cáo huấn luyện', path: '/training-reports', icon: '📚' },
    { label: 'Báo cáo tập huấn', path: '/workshop-reports', icon: '🎓' },
    { label: 'Báo cáo nhiệm vụ', path: '/task-reports', icon: '✅' },
    { label: 'Thiết bị mất kết nối', path: '/device-reports', icon: '⚠️' },
    { label: 'Xuất báo cáo', path: '/export', icon: '📥' },
    { label: 'Thống kê', path: '/statistics', icon: '📈' },
    { label: 'Cài đặt', path: '/settings', icon: '⚙️' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="h-screen flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            {isOpen && <span className="ml-3 font-bold text-primary">HTLBC</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={!isOpen ? item.label : ''}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {isOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>
    </div>
  );
}
