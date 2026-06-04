import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { dashboardAPI } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Đang tải...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Tổng quan hệ thống báo cáo</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card 
          title="Tổng nhân sự" 
          value={stats?.totalPersonnel || 0} 
          icon="👥" 
        />
        <Card 
          title="Tổng đơn vị" 
          value={stats?.totalUnits || 0} 
          icon="🏢" 
        />
        <Card 
          title="Tổng thiết bị" 
          value={stats?.totalDevices || 0} 
          icon="💻" 
        />
        <Card 
          title="Thiết bị lỗi" 
          value={stats?.deviceErrors || 0} 
          icon="⚠️" 
          color="bg-red-500"
        />
        <Card 
          title="Báo cáo tháng" 
          value={stats?.monthReports || 0} 
          icon="📊" 
          color="bg-blue-500"
        />
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-red-800 text-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2">Chào mừng đến Hệ thống tổng hợp báo cáo</h2>
        <p className="text-red-100">
          Hệ thống quản lý báo cáo nội bộ cho đơn vị quân sự. Sử dụng menu bên trái để truy cập các chức năng.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-semibold text-gray-800">Tạo báo cáo huấn luyện</h3>
          <p className="text-sm text-gray-600 mt-1">Thêm báo cáo huấn luyện mới</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-3xl mb-2">👤</div>
          <h3 className="font-semibold text-gray-800">Quản lý nhân sự</h3>
          <p className="text-sm text-gray-600 mt-1">Cập nhật thông tin cá nhân</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-3xl mb-2">📥</div>
          <h3 className="font-semibold text-gray-800">Xuất báo cáo</h3>
          <p className="text-sm text-gray-600 mt-1">Xuất Excel, PDF</p>
        </div>
      </div>
    </div>
  );
}
