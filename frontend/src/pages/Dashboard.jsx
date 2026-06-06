import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import Card from '../components/Card';
import { dashboardAPI } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = {
  primary: '#C62828',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
  info: '#2196F3',
  light: '#E0E0E0'
};

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

  // Mock data - replace with real data from backend
  const monthlyReportsData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Báo cáo huấn luyện',
        data: [12, 19, 8, 15, 10, 14],
        backgroundColor: chartColors.primary,
        borderColor: chartColors.primary,
        borderWidth: 1
      },
      {
        label: 'Báo cáo tập huấn',
        data: [8, 12, 15, 10, 16, 12],
        backgroundColor: chartColors.info,
        borderColor: chartColors.info,
        borderWidth: 1
      },
      {
        label: 'Báo cáo thiết bị',
        data: [5, 8, 6, 12, 8, 10],
        backgroundColor: chartColors.warning,
        borderColor: chartColors.warning,
        borderWidth: 1
      }
    ]
  };

  const deviceStatusData = {
    labels: ['Hoạt động', 'Lỗi', 'Bảo trì', 'Ngừng hoạt động'],
    datasets: [
      {
        data: [
          stats?.deviceWorking || 0,
          stats?.deviceErrors || 0,
          stats?.deviceMaintenance || 5,
          stats?.deviceDown || 2
        ],
        backgroundColor: [
          chartColors.success,
          chartColors.danger,
          chartColors.warning,
          chartColors.light
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const taskStatusData = {
    labels: ['Hoàn thành', 'Đang thực hiện', 'Chờ', 'Tạm dừng'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          chartColors.success,
          chartColors.info,
          chartColors.warning,
          chartColors.danger
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const personnelByPositionData = {
    labels: ['Sĩ quan', 'Hạ sĩ', 'Binh nhất', 'Binh nhì', 'Quân nhân'],
    datasets: [
      {
        label: 'Số lượng nhân sự',
        data: [15, 32, 28, 18, 12],
        backgroundColor: chartColors.primary,
        borderColor: chartColors.primary,
        borderWidth: 1
      }
    ]
  };

  const completionRates = [
    { name: 'Báo cáo huấn luyện', rate: 85 },
    { name: 'Báo cáo tập huấn', rate: 72 },
    { name: 'Báo cáo thiết bị', rate: 90 },
    { name: 'Báo cáo nhiệm vụ', rate: 65 }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 12 },
          padding: 15
        }
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Tổng quan hệ thống báo cáo quân sự</p>
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
        <h2 className="text-2xl font-bold mb-2">Chào mừng đến Hệ thống báo cáo quân sự</h2>
        <p className="text-red-100">
          Nền tảng quản lý báo cáo tập trung cho các đơn vị quân sự. Theo dõi báo cáo huấn luyện, tập huấn, thiết bị và nhiệm vụ một cách hiệu quả.
        </p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Báo cáo theo tháng */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Báo cáo theo tháng</h3>
          <div className="h-80">
            <Bar 
              data={monthlyReportsData}
              options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 20
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Trạng thái thiết bị */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔧 Trạng thái thiết bị</h3>
          <div className="h-80 flex justify-center">
            <div className="w-80">
              <Pie 
                data={deviceStatusData}
                options={chartOptions}
              />
            </div>
          </div>
        </div>

        {/* Trạng thái nhiệm vụ */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">✅ Trạng thái nhiệm vụ</h3>
          <div className="h-80 flex justify-center">
            <div className="w-80">
              <Doughnut 
                data={taskStatusData}
                options={chartOptions}
              />
            </div>
          </div>
        </div>

        {/* Nhân sự theo chức vụ */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">👨‍✈️ Nhân sự theo chức vụ</h3>
          <div className="h-80">
            <Bar 
              data={personnelByPositionData}
              options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Completion Rates */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">📈 Tỷ lệ hoàn thành báo cáo</h3>
        <div className="space-y-6">
          {completionRates.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">{item.name}</span>
                <span className="text-lg font-bold text-primary">{item.rate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${item.rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-semibold text-gray-800">Tạo báo cáo</h3>
          <p className="text-sm text-gray-600 mt-1">Thêm báo cáo mới cho hệ thống</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500">
          <div className="text-3xl mb-2">👤</div>
          <h3 className="font-semibold text-gray-800">Quản lý nhân sự</h3>
          <p className="text-sm text-gray-600 mt-1">Cập nhật thông tin nhân sự</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-red-500">
          <div className="text-3xl mb-2">📥</div>
          <h3 className="font-semibold text-gray-800">Xuất báo cáo</h3>
          <p className="text-sm text-gray-600 mt-1">Xuất dữ liệu Excel, PDF</p>
        </div>
      </div>

      {/* Footer Statistics */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📌 Thông tin bổ sung</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Báo cáo chưa xử lý</p>
            <p className="text-2xl font-bold text-primary mt-1">8</p>
          </div>
          <div>
            <p className="text-gray-600">Nhiệm vụ quá hạn</p>
            <p className="text-2xl font-bold text-red-500 mt-1">3</p>
          </div>
          <div>
            <p className="text-gray-600">Cập nhật gần đây</p>
            <p className="text-2xl font-bold text-green-500 mt-1">2 giờ trước</p>
          </div>
        </div>
      </div>
    </div>
  );
}
