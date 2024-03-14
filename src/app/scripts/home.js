import "../styles/home.scss";
import chatImage from "../assets/images/1Login-Register/Textura-forms-fondo.png";
import axios from "axios";
import endpoints from "../services/data";

const chatBackground = document.getElementById("home-chat-conversation");

chatBackground.setAttribute("src", chatImage);

chatBackground.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.300)),
url(${chatImage})`


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
      <figure class="home__modal-header-img">
        <img src="${userData.profileImageUrl}" alt="${userData.name}">
        <h4>¡Hola, ${userData.name}!</h4>
      </figure>
      `;
    } else {
      console.error('No se pudo obtener la imagen del usuario o no se proporcionó una URL de imagen de perfil');
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
};


// Función para obtener y mostrar los chats del usuario logueado
const recentChats = async () => {
  try {
    // Obtener el ID del usuario logueado del sessionStorage
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('No se encontró el ID del usuario en el sessionStorage');
      return;
    }

    // Realizar una solicitud al servidor para obtener todas las conversaciones
    const url = endpoints.messages;
    const response = await axios.get(url);
    
    if (response.status !== 200) {
      console.error('Error al obtener los datos de las conversaciones:', response.statusText);
      return;
    }

    // Obtener todas las conversaciones del servidor
    const conversations = response.data;

    // Filtrar las conversaciones para obtener solo aquellas en las que el usuario logueado está involucrado
    const userChats = conversations.filter(chat =>
      chat.senderUser == userId || chat.recipientUser == userId,
    );

    // Obtener el contenedor de los chats en el HTML
    const chatsContainer = document.getElementById('recent-chats');

    // Limpiar el contenedor antes de agregar los nuevos chats
    chatsContainer.innerHTML = '';

    // Iterar sobre los chats del usuario y agregarlos al contenedor en el HTML
    userChats.forEach(chat => {
      // Crear el elemento HTML para el chat

      const chatElement = document.createElement('article');
      chatElement.classList.add('home__modal-chat');

      // Agregar el contenido del chat al elemento HTML
      chatElement.innerHTML = `
        <img class="home__modal-chat-img" src="..." alt="Usuario de la conversación">
        <section class="home__modal-chat-preview">
          <span class="home__modal-chat-contact">
            <h4>${chat.recipientUser}</h4>
            <p>Viernes</p>
          </span>
          <span class="home__modal-chat-text">
            <i class="fa-solid fa-check-double"></i>
            <p class="home__modal-description">Lorem ipsum dolor, sit...</p>
          </span>
        </section>
      `;

      // Agregar el chat al contenedor de chats en el HTML
      chatsContainer.appendChild(chatElement);
    });

  } catch (error) {
    console.error('Error al obtener y mostrar los chats del usuario:', error);
  }
};

// Llamar a la función para obtener y mostrar los chats del usuario logueado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  fillUserHeader();
  recentChats();
});




