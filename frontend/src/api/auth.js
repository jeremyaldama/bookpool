import axios from "./axios";

// cuando no hay {}, implícitamente se hace return
export const registerRequest = async (user) => {
  console.log("reg", user);
  return axios.post(`/users/signup`, user);
};

export const loginRequest = async (user) => {
  console.log("log", user);
  return axios.post(`/users/login`, user);
};

export const verifyTokenRequest = async () => axios.get(`/users/verify`);
