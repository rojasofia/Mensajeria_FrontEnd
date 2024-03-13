import "../styles/home.scss";
import logo from "../assets/images/logo-bordeado.png";
import chatImage from "../assets/images/1Login-Register/Textura-forms-fondo.png";
import axios from "axios";
import endpoints from "../services/data";

const chatBackground = document.getElementById("home-chat-conversation");

chatBackground.setAttribute("src", chatImage);

chatBackground.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.300)),
url(${chatImage})`


const logoHome = document.getElementById("logo-home");
logoHome.setAttribute("src", logo);


const fillUserHeader = async () => {
  try {
    // Obtener el ID del usuario del almacenamiento local
    const userId = sessionStorage.getItem('userId');
    console.log(userId)
    if (!userId) {
      console.error('No se encontró el ID del usuario en el almacenamiento local');
      return;
    }

    // Realizar una solicitud al servidor para obtener los datos del usuario
    const url = endpoints.getDataUser(userId);
    console.log(url)
    const response = await axios.get(url);
    
    if (response.status !== 200) {
      console.error('Error al obtener los datos del usuario:', response.statusText);
      return;
    }

    // Obtener los datos del usuario de la respuesta
    const userData = response.data[0];

    console.log("hola",userData)


    // Verificar si se obtuvo correctamente la imagen de perfil del usuario
    if (userData.profileImageUrl) {
      // Obtener el contenedor de la imagen del usuario
      const profileContainer = document.getElementById('profile');

      // Actualizar la imagen del usuario en el HTML dentro del contenedor profile
      profileContainer.innerHTML = `
        <img src="${userData.profileImageUrl}" alt="${userData.name}">
        <h4>¡Hola, ${userData.name}!</h4>
      `;
    } else {
      console.error('No se pudo obtener la imagen del usuario o no se proporcionó una URL de imagen de perfil');
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
};

// Llamar a la función para llenar el header con la foto del usuario logueado al cargar la página
window.addEventListener('DOMContentLoaded', fillUserHeader);




