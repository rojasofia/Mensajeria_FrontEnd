import axios from "axios";
import endpoints from "./data";

export const createUser = async (user) => {
    try {
      const response = await axios.post(endpoints.users, user);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  

   