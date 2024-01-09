import axios from "./axios";

export const createBookByUserRequest = async (data) =>
  axios.post("/books", data);
export const getBooksByUserRequest = async () => axios.get("/books");
export const getBookByUserRequest = async (id) => axios.get(`/books/${id}`);
export const updateBookByUserRequest = async (id, book) =>
  axios.patch(`/books/${id}`, book);
export const deleteBookByUserRequest = async (id) =>
  axios.delete(`/books/${id}`);
