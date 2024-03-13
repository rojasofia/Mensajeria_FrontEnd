const URL_BASE = "https://backmensajeriafrontend-production.up.railway.app/";

const endpoints = {
  getAnUser: (phoneNumber, password) =>
    `${URL_BASE}users?phoneNumber=${phoneNumber}&password=${password}`,
  users: `${URL_BASE}users`,
  getDataUser: (id) =>
    `${URL_BASE}users?id=${id}`,
};

export default endpoints;

export const users = [];