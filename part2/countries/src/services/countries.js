import axios from "axios";

const defaultUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAll = () => {
  const response = axios.get(`${defaultUrl}/all`)
  return response
};

export default { getAll };