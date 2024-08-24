import axios from "axios";

const defaultUrl = "https://wttr.in";

const getWeather = (city) => {
  const response = axios.get(`${defaultUrl}/${city}?format=3`);
  return response;
};

export default { getWeather };
