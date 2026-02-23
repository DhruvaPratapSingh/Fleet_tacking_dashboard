import axios from "axios";

const BASE_URL = "https://case-study-26cf.onrender.com";

export const getVehicles = async (status = "") => {
  let url = `${BASE_URL}/api/vehicles`;
  if (status && status !== "all") {
    url += `?status=${status}`;
  }
  const res = await axios.get(url);
  return res.data.data;
};

export const getVehicleById = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/vehicles/${id}`);
  return res.data.data;
};