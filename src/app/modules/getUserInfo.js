import axios from "axios";
import endpoints from "../services/data";

const getUserInfo = async (userId) => {
    try {
        const response = await axios.get(endpoints.getDataUser(userId));
        return response.data[0]; 
    } catch (error) {
        console.error(error);
        return null;
    }
  };

  export default getUserInfo;