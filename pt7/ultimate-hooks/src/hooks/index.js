import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = () => {
    axios
      .get(baseUrl)
      .then((r) => setResources(r.data))
      .catch((e) => console.log(e));
  };

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource).then((r) => r.data);
    setResources(resources.concat(res));
  };

  const service = {
    create,
    getAll,
  };

  return [resources, service];
};
