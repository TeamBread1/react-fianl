import axios from "axios";

const onetooneApi = {
  add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/onetoone`, data),

  fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/onetoone`),

  remove: (id) =>
    axios.delete(`${process.env.REACT_APP_API_BASE}/onetoone/${id}`),
  modify: (data) =>
    axios.put(`${process.env.REACT_APP_API_BASE}/onetoone/${data.id}`, data),
};

export default onetooneApi;
