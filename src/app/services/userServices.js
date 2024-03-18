import axios from "axios";
import endpoints from "./data";
const URL_BASE = "https://backmensajeriafrontend-production.up.railway.app/";

export const getUser = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};



export const getConversation = async (userId, friendId) => {
  try {
    // Primera consulta para buscar conversaciones donde userId sea el remitente y friendId sea el destinatario
    let response = await axios.get(`${URL_BASE}messages?senderUser=${userId}&recipientUser=${friendId}`);
    let conversations = response.data;

    // Si no hay conversaciones encontradas, intenta con la otra combinación
    if (conversations.length === 0) {
      response = await axios.get(`${URL_BASE}messages?senderUser=${friendId}&recipientUser=${userId}`);
      conversations = response.data;
    }

    return conversations;

    console.lo
  } catch (error) {
    console.error("Error al obtener la conversación:", error);
    throw error;
  }
};


export const getDataUser = async (id) => {
  try {
    const response = await axios.get(endpoints.getDataUser(id));
    if (response.status !== 200) {
      throw new Error('No se pudieron obtener los datos del usuario');
    }
    return response.data[0];
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
};