import axios from "axios";

const BASE_URL = "https://case-study-26cf.onrender.com";

export const getStatistics = async () => {
  const res = await axios.get(`${BASE_URL}/api/statistics`);
  return res.data.data;
};