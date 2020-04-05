import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newAnec) => {
  const res = await axios.post(baseUrl, asObject(newAnec));
  return res.data;
};

const like = async (id) => {
  const tmp = await axios.get(`${baseUrl}/${id}`);
  const res = await axios.put(`${baseUrl}/${id}`, {
    ...tmp.data,
    votes: tmp.data.votes + 1,
  });
  return res.data;
};

export default { getAll, create, like };
