import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (cred) => {
  const res = await axios.post(baseUrl, cred);
  return res.data;
};

export default { create, getAll };
