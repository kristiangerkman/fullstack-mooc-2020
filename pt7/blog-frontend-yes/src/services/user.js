import axios from "axios";
const baseUrl = "/api/users";

const create = async (cred) => {
  const res = await axios.post(baseUrl, cred);
  return res.data;
};

export default { create };
