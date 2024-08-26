import axios from "axios";

const baseUrl = "/api/v1/persons";

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const getAll = () => {
  console.log("que pasa chavales tios")
  return axios.get(baseUrl).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const partialUpdate = (id, partial) => {
  return axios
    .patch(`${baseUrl}/${id}`, partial)
    .then((response) => response.data);
};

export default { create, getAll, remove, partialUpdate };
