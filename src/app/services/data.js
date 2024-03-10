const URL_BASE = "https://backmensajeriafrontend-production.up.railway.app/";

const endpoints = {
  getAnUser: (phoneNumber, password) =>
    `${URL_BASE}users?phoneNumber=${phoneNumber}&password=${password}`,
  users: `${URL_BASE}users`,
};

export default endpoints;