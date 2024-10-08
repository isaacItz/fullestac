import axios from "axios";
const baseUrl = "/api/v1/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (updatedNote) => {
  const request = axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
};
