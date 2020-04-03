import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  };

  const res = await axios.post(baseUrl, newObj, config);
  return res.data;
};

const deleteBlog = async id => {
  return await axios.delete(`${baseUrl}/${id}`);
};

const update = async (id, newObj) => {
  const req = await axios.put(`${baseUrl}/${id}`, newObj);
  return req.data;
};

export default { getAll, create, update, setToken, deleteBlog };
