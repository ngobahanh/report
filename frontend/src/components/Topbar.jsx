import React, { useState } from 'react';

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="bg-white shadow-md border-b-4 border-primary">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">HỆ THỐNG TỔNG HỢP BÁO CÁO</h1>
          <p className="text-sm text-gray-600">Quản lý báo cáo cho đơn vị quân sự</p>
        </div>

        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary w-64"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-600 hover:text-primary transition-colors"
            >
              🔔
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800">Thông báo</h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-800">Có 2 thiết bị mất kết nối</p>
                    <p className="text-xs text-gray-500 mt-1">5 phút trước</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-800">Báo cáo huấn luyện tháng 5 đã sẵn sàng</p>
                    <p className="text-xs text-gray-500 mt-1">1 giờ trước</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">Quản trị viên</p>
                  <p className="text-xs text-gray-500">admin@system.local</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Đổi mật khẩu
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-200">
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
