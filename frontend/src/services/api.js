import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export const getAllAdvertisements = () => api.get("/manager/advertisements");

export const getActiveAdvertisements = () => api.get("/student/advertisements");

export const getStudentAdvertisementById = (id) => api.get(`/student/advertisements/${id}`);

export const getExpiredAdvertisements = () => api.get("/manager/advertisements/expired");

export const getManagerActiveAdvertisements = () => api.get("/manager/advertisements/active");

export const createAdvertisement = (payload) =>
  api.post("/manager/advertisements", payload);

export const uploadAdvertisementImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/manager/advertisements/images", formData);
};

export const updateAdvertisement = (id, payload) =>
  api.put(`/manager/advertisements/${id}`, payload);

export const deleteAdvertisement = (id) =>
  api.delete(`/manager/advertisements/${id}`);

export default api;



