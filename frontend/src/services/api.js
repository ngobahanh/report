import axios from 'axios';

const API_BASE = '';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
});

// Personnel
export const personnelAPI = {
  getAll: (page = 1, limit = 10, search = '', filters = {}) => {
    let url = `${API_BASE}/personnel?page=${page}&limit=${limit}&search=${search}`;
    if (filters.rank) url += `&rank=${filters.rank}`;
    if (filters.position) url += `&position=${filters.position}`;
    if (filters.unitId) url += `&unitId=${filters.unitId}`;
    if (filters.hometown) url += `&hometown=${filters.hometown}`;
    return api.get(url);
  },
  getById: (id) => api.get(`${API_BASE}/personnel/${id}`),
  create: (data) => api.post(`${API_BASE}/personnel`, data),
  update: (id, data) => api.put(`${API_BASE}/personnel/${id}`, data),
  delete: (id) => api.delete(`${API_BASE}/personnel/${id}`),
  getByUnit: (unitId) => api.get(`${API_BASE}/personnel/unit/${unitId}`)
};

// Units
export const unitsAPI = {
  getAll: (search = '') => api.get(`${API_BASE}/units?search=${search}`),
  getById: (id) => api.get(`${API_BASE}/units/${id}`),
  create: (data) => api.post(`${API_BASE}/units`, data),
  update: (id, data) => api.put(`${API_BASE}/units/${id}`, data),
  delete: (id) => api.delete(`${API_BASE}/units/${id}`)
};

// Training Reports
export const trainingReportsAPI = {
  getAll: (page = 1, limit = 10, startDate = null, endDate = null) => {
    let url = `${API_BASE}/training-reports?page=${page}&limit=${limit}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    return api.get(url);
  },
  getById: (id) => api.get(`${API_BASE}/training-reports/${id}`),
  create: (data) => api.post(`${API_BASE}/training-reports`, data),
  update: (id, data) => api.put(`${API_BASE}/training-reports/${id}`, data),
  delete: (id) => api.delete(`${API_BASE}/training-reports/${id}`),
  getStats: () => api.get(`${API_BASE}/training-reports/stats`)
};

// Workshop Reports
export const workshopReportsAPI = {
  getAll: (page = 1, limit = 10, startDate = null, endDate = null) => {
    let url = `${API_BASE}/workshop-reports?page=${page}&limit=${limit}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    return api.get(url);
  },
  getById: (id) => api.get(`${API_BASE}/workshop-reports/${id}`),
  create: (data) => api.post(`${API_BASE}/workshop-reports`, data),
  update: (id, data) => api.put(`${API_BASE}/workshop-reports/${id}`, data),
  delete: (id) => api.delete(`${API_BASE}/workshop-reports/${id}`)
};

// Task Reports
export const taskReportsAPI = {
  getAll: (page = 1, limit = 10, startDate = null, endDate = null) => {
    let url = `${API_BASE}/task-reports?page=${page}&limit=${limit}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    return api.get(url);
  },
  getById: (id) => api.get(`${API_BASE}/task-reports/${id}`),
  create: (data) => api.post(`${API_BASE}/task-reports`, data),
  update: (id, data) => api.put(`${API_BASE}/task-reports/${id}`, data),
  delete: (id) => api.delete(`${API_BASE}/task-reports/${id}`)
};

// Device Reports
export const deviceReportsAPI = {
  getAll: (page = 1, limit = 10, status = null, unitId = null) => {
    let url = `${API_BASE}/device-reports?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    if (unitId) url += `&unitId=${unitId}`;
    return api.get(url);
  },
  getById: (id) => api.get(`${API_BASE}/device-reports/${id}`),
  create: (data) => api.post(`${API_BASE}/device-reports`, data),
  update: (id, data) => api.put(`${API_BASE}/device-reports/${id}`, data),
  delete: (id) => api.delete(`${API_BASE}/device-reports/${id}`),
  getStats: () => api.get(`${API_BASE}/device-reports/stats`)
};

// Dashboard
export const dashboardAPI = {
  getStats: () => api.get(`${API_BASE}/dashboard/stats`),
  getChartsData: () => api.get(`${API_BASE}/dashboard/charts`)
};

// Export
export const exportAPI = {
  exportToExcel: (reportType, startDate, endDate, unitId) => {
    let url = `${API_BASE}/export/excel?reportType=${reportType}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    if (unitId) url += `&unitId=${unitId}`;
    window.open(url);
  },
  exportToPDF: (reportType, startDate, endDate) => {
    let url = `${API_BASE}/export/pdf?reportType=${reportType}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    window.open(url);
  }
};

export default api;
