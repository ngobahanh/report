import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Personnel from './pages/Personnel';
import Units from './pages/Units';
import TrainingReports from './pages/TrainingReports';
import TrainingReportDetail from './pages/TrainingReportDetail';
import WorkshopReports from './pages/WorkshopReports';
import WorkshopReportDetail from './pages/WorkshopReportDetail';
import TaskReports from './pages/TaskReports';
import TaskReportDetail from './pages/TaskReportDetail';
import DeviceReports from './pages/DeviceReports';
import DeviceReportDetail from './pages/DeviceReportDetail';
import ExportReports from './pages/ExportReports';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/personnel" element={<Personnel />} />
                <Route path="/units" element={<Units />} />
                <Route path="/training-reports" element={<TrainingReports />} />
                <Route path="/training-reports/:id" element={<TrainingReportDetail />} />
                <Route path="/workshop-reports" element={<WorkshopReports />} />
                <Route path="/workshop-reports/:id" element={<WorkshopReportDetail />} />
                <Route path="/task-reports" element={<TaskReports />} />
                <Route path="/task-reports/:id" element={<TaskReportDetail />} />
                <Route path="/device-reports" element={<DeviceReports />} />
                <Route path="/device-reports/:id" element={<DeviceReportDetail />} />
                <Route path="/export" element={<ExportReports />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
