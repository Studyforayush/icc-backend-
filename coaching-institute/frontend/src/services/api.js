import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Courses API
export const coursesAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
};

// Toppers API
export const toppersAPI = {
  getAll: () => api.get('/toppers'),
  getById: (id) => api.get(`/toppers/${id}`),
  create: (data) => api.post('/toppers', data),
  update: (id, data) => api.put(`/toppers/${id}`, data),
  delete: (id) => api.delete(`/toppers/${id}`),
};

// Feedback API
export const feedbackAPI = {
  getAll: () => api.get('/feedback'),
  getAllAdmin: () => api.get('/feedback/all'),
  getById: (id) => api.get(`/feedback/${id}`),
  create: (data) => api.post('/feedback', data),
  approve: (id) => api.put(`/feedback/${id}/approve`),
  delete: (id) => api.delete(`/feedback/${id}`),
};

// Messages API
export const messagesAPI = {
  getAll: () => api.get('/messages'),
  getById: (id) => api.get(`/messages/${id}`),
  create: (data) => api.post('/messages', data),
  reply: (id, data) => api.put(`/messages/${id}/reply`, data),
  markRead: (id) => api.put(`/messages/${id}/read`),
  delete: (id) => api.delete(`/messages/${id}`),
};

// Chat API
export const chatAPI = {
  send: (messages) => api.post('/chat', { messages }),
};

export default api;
