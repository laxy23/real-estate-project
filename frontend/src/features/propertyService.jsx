import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/property";

const getAll = async () => {
  const res = await axios.get(API_URL);

  return res.data.property;
};

const getAllPosts = async () => {
  const res = await axios.get(`${API_URL}/get/posts`, {
    withCredentials: true,
  });

  return res.data.property;
};

const getByFilter = async (url) => {
  const res = await axios.get(`${API_URL}?${url}`);

  return res.data.prop;
};

const getSingle = async (url) => {
  const res = await axios.get(`${API_URL}/${url}`);

  return res.data.property;
};

const getSimilar = async (type) => {
  const res = await axios.get(`${API_URL}/type/${type}`);

  return res.data.property;
};

const getLocation = async (location) => {
  const res = await axios.get(`${API_URL}/loc/${location}`);
  return res.data.data;
};

const createProperty = async (data) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };

  const res = await axios.post(`${API_URL}`, data, config);
  return res;
};

const propertyService = {
  getAll,
  getByFilter,
  createProperty,
  getSingle,
  getLocation,
  getSimilar,
  getAllPosts,
};

export default propertyService;
