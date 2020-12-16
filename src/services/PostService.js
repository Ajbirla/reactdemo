import https from "../baseurl";

const getAll = () => {
  return https.get("/posts");
};

const show = (id) => {
  return https.get(`/posts/${id}`);
};

const create = (data) => {
  return https.post("/posts", data);
};

const update = (id, data) => {
  return https.put(`/posts/${id}`, data);
};

const remove = (id) => {
  return https.delete(`/posts/${id}`);
};

export default {
  getAll,
  show,
  create,
  update,
  remove,
};
