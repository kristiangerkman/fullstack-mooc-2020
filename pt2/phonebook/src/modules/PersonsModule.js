import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios
    .get(baseURL)
    .then(r => r.data)
    .catch(e => console.log("error handling get req: ", e));
};

const create = newPerson => {
  return axios
    .post(baseURL, newPerson)
    .then(r => r.data)
    .catch(e => console.log("error handling create req: ", e));
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseURL}/${id}`, updatedPerson).then(r => r.data);
};

const deletePerson = id => {
  axios
    .delete(`${baseURL}/${id}`)
    .catch(e => console.log("error handling delete req: ", e));
};

export default {
  getAll,
  create,
  update,
  deletePerson
};
