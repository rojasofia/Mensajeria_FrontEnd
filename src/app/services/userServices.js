import axios from "axios";
// import endpoints from "./data";

export const getUser = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const getAnUser = async (phone, pass) => {
//   try {
//     const url = endpoints.users;
//     const { data } = await axios.get(url, {
//       params: {
//         phoneNumber: phone,
//         password: pass,
//       },
//     });
//     return data[0];
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
