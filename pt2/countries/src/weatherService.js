import axios from "axios";

const getWeather = (country) => {
  return axios
    .get(
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country}`
    )
    .then((r) => r.data)
    .catch((e) => console.log(e));
};

export default { getWeather };
