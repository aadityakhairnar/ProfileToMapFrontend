import axios from 'axios';

// Make sure this URL points to the correct backend URL (running on port 5000)
const API_URL = 'http://localhost:5000/api';

export const getProfiles = async () => {
  const response = await axios.get(`${API_URL}/profiles`);
  return response.data;
};

export const getProfile = async (id) => {
  const response = await axios.get(`${API_URL}/profiles/${id}`);
  return response.data;
};

export const createProfile = async (profileData) => {
  const response = await axios.post(`${API_URL}/profiles`, profileData);
  return response.data;
};

export const updateProfile = async (id, profileData) => {
  const response = await axios.put(`${API_URL}/profiles/${id}`, profileData);
  return response.data;
};

export const deleteProfile = async (id) => {
  const response = await axios.delete(`${API_URL}/profiles/${id}`);
  return response.data;
};
