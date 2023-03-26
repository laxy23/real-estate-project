import axios from "axios";

const API_URL = "/api/v1/auth";

const register = async (userData) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem("eliteuser", JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true,
  });

  if (res.data) {
    localStorage.setItem("eliteuser", JSON.stringify(res.data));
  }

  return res.data;
};

const getMyProperty = async () => {
  const res = await axios.get(`${API_URL}/myProperty/get`, {
    withCredentials: true,
  });

  return res.data.property;
};

const deleteProperty = async (propertyId) => {
  const res = await axios.delete(`${API_URL}/delete/${propertyId}`, {
    withCredentials: true,
  });

  return res.data.property;
};

const authService = {
  register,
  login,
  getMyProperty,
  deleteProperty,
};

export default authService;
