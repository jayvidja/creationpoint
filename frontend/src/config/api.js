// API Configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const normalizeImageUrl = (url) => {
  if (!url) return url;
  return url.replace(/^(https?:)?\/\/localhost:3000/i, API_URL);
};

export const API_ENDPOINTS = {
  // Users
  users: `${API_URL}/api/users`,
  register: `${API_URL}/api/users/register`,
  login: `${API_URL}/api/users/login`,
  logout: `${API_URL}/api/users/logout`,
  profile: `${API_URL}/api/users/me`,
  usersCount: `${API_URL}/api/users/count`,

  // Gallery
  gallery: `${API_URL}/api/gallery`,
  galleryUpload: `${API_URL}/api/gallery/upload`,
  galleryCount: `${API_URL}/api/gallery/count`,
  galleryItem: (id) => `${API_URL}/api/gallery/${id}`,
};

export default API_ENDPOINTS;
