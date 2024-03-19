import "../styles/home.scss";
import chatImage from "../assets/images/1Login-Register/Textura-forms-fondo.png";
import axios from "axios";
import endpoints from "../services/data";
import toggleModal from "../modules/toggleModal";
import getUserInfo from "../modules/getUserInfo";
import showDefaultOrUserProfileImage from "../modules/showDefaultOrUserProfileImage";
import showPreviewContainer from "../modules/showPreviewContainer";
import initializePage from "../modules/initializePage";
import lastOnline from "../modules/lastOnline";

// Definir userId como variable global
let userId;

// Objeto para almacenar usuarios únicos
const uniqueUsers = {};

const chatBackground = document.getElementById("home-chat-conversation");

chatBackground.setAttribute("src", chatImage);

chatBackground.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.300)),
url(${chatImage})`;

const fillUserHeader = async () => {
  try {
    // Obtener el ID del usuario del almacenamiento local
    userId = sessionStorage.getItem('userId');

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
    userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('No se encontró el ID del usuario en el sessionStorage');
      return;
    }

    // Realizar una solicitud al servidor para obtener todas las conversaciones
    const urlConversations = endpoints.messages;
    const responseConversations = await axios.get(urlConversations);
    
    if (responseConversations.status !== 200) {
      console.error('Error al obtener los datos de las conversaciones:', responseConversations.statusText);
      return;
    }

    // Obtener todas las conversaciones del servidor
    const conversations = responseConversations.data;

    // Obtener el contenedor de los chats en el HTML
    const chatsContainer = document.getElementById('recent-chats');

    // Limpiar el contenedor antes de agregar los nuevos chats
    chatsContainer.innerHTML = '';

    // Iterar sobre las conversaciones del usuario y agregarlas al contenedor en el HTML
    for (const chat of conversations) {
      if (chat.senderUser == userId || chat.recipientUser == userId) {
        let otherUserId = chat.senderUser;
        if (chat.senderUser == userId) {
          otherUserId = chat.recipientUser;
        }

        // Realizar una solicitud al servidor para obtener los datos del usuario
        const urlUser = endpoints.getDataUser(otherUserId);
        const responseUser = await axios.get(urlUser);

        if (responseUser.status === 200) {
          const userData = responseUser.data[0];
          const lastMessage = chat.conversations[chat.conversations.length - 1];

          // Verificar si el usuario ya existe en la lista antes de agregarlo
          if (!uniqueUsers[userData.id]) {
            // Si el usuario no existe en el objeto de usuarios únicos, lo agregamos
            uniqueUsers[userData.id] = userData;

            // Crear el elemento HTML para el chat
            const chatElement = document.createElement('article');
            chatElement.classList.add('home__modal-chat');

            // Agregar el contenido del chat al elemento HTML
            chatElement.innerHTML = `
              <img class="home__modal-chat-img" src="${userData.profileImageUrl}" alt="${userData.name}">
              <section class="home__modal-chat-preview">
                <span class="home__modal-chat-contact">
                  <h4>${userData.name}</h4>
                  <p>${lastMessage.date}</p>
                </span>
                <span class="home__modal-chat-text">
                  <i class="fa-solid fa-check-double"></i>
                  <p class="home__modal-description">${lastMessage.message}</p>
                </span>
              </section>
            `;

            // Agregar el chat al contenedor de chats en el HTML
            chatsContainer.appendChild(chatElement);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error al obtener y mostrar los chats del usuario:', error);
  }
};


// Función para realizar la búsqueda de chats
const searchChats = async () => {
  try {
    // Obtener el valor del campo de búsqueda
    const searchValue = document.querySelector('.home__modal-header-input').value.toLowerCase();

    // Verificar si userId está definido
    if (!userId) {
      console.error('No se encontró el ID del usuario');
      return;
    }

    // Realizar una solicitud al servidor para obtener todas las conversaciones
    const urlConversations = endpoints.messages;
    const responseConversations = await axios.get(urlConversations);
    
    if (responseConversations.status !== 200) {
      console.error('Error al obtener los datos de las conversaciones:', responseConversations.statusText);
      return;
    }

    // Obtener todas las conversaciones del servidor
    const conversations = responseConversations.data;

    // Obtener el contenedor de los chats en el HTML
    const chatsContainer = document.getElementById('recent-chats');

    // Limpiar el contenedor antes de agregar los nuevos chats
    chatsContainer.innerHTML = '';
    
    // Iterar sobre las conversaciones del usuario y agregarlas al contenedor en el HTML
    for (const chat of conversations) {
      if (chat.senderUser == userId || chat.recipientUser == userId) {
        let otherUserId = chat.senderUser;
        if (chat.senderUser == userId) {
          otherUserId = chat.recipientUser;
        }

        // Realizar una solicitud al servidor para obtener los datos del usuario
        const urlUser = endpoints.getDataUser(otherUserId);
        const responseUser = await axios.get(urlUser);

        if (responseUser.status === 200) {
          const userData = responseUser.data[0];
          const lastMessage = chat.conversations[chat.conversations.length - 1];

          // Verificar si el nombre del usuario, número de teléfono o el mensaje coinciden con el criterio de búsqueda
          if (userData.name.toLowerCase().includes(searchValue) || 
              userData.phoneNumber.toLowerCase().includes(searchValue) || 
              lastMessage.message.toLowerCase().includes(searchValue)) {
            // Crear el elemento HTML para el chat
            const chatElement = document.createElement('article');
            chatElement.classList.add('home__modal-chat');
            
            // Agregar el contenido del chat al elemento HTML
            chatElement.innerHTML = `
              <img class="home__modal-chat-img" src="${userData.profileImageUrl}" alt="${userData.name}">
              <section class="home__modal-chat-preview">
                <span class="home__modal-chat-contact">
                  <h4>${userData.name}</h4>
                  <p>${lastMessage.date}</p>
                </span>
                <span class="home__modal-chat-text">
                  <i class="fa-solid fa-check-double"></i>
                  <p class="home__modal-description">${lastMessage.message}</p>
                </span>
                </section>
            `;
            
            // Agregar el chat al contenedor de chats en el HTML
            chatsContainer.appendChild(chatElement);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error al realizar la búsqueda de chats:', error);
  }
};

// Llamar a la función para realizar la búsqueda de chats cuando haya un evento de entrada en el campo de búsqueda
document.querySelector('.home__modal-header-input').addEventListener('input', searchChats);

// Llamar a la función para obtener y mostrar los chats del usuario logueado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  fillUserHeader();
  recentChats();
});







// Codigo de Gaby: FUNCION PARA MOSTRAR EL MODAL DE INFO DE PERFIL
const profileButton = document.getElementById("profile");
const modal = document.querySelector(".section__modal-container");
const closeButton = document.getElementById("closeModal");

toggleModal(profileButton, modal);
toggleModal(closeButton, modal);

const previewImg = document.getElementById("previewImg");
const inputUrl = document.getElementById('profileImageUrl');

// Función para obtener la información del usuario actual
getUserInfo(userId);
// Función para mostrar la imagen predeterminada o la imagen del usuario actual
showDefaultOrUserProfileImage(userId);
// Función para inicializar la página
initializePage(userId);
// Event Listener para cambiar la imagen de previsualización al escribir una URL
showPreviewContainer(inputUrl, previewImg);


// Event Listener para enviar el formulario... (no pude separarlo, depende mucho de las otras funciones)
document.getElementById('formProfile').addEventListener('submit', async (event) => {
    event.preventDefault();

    const imgUrl = document.getElementById('profileImageUrl').value;
    const name = document.getElementById('name').value;
    const userInfo = document.getElementById('userInfo').value;

    try {
        const userId = sessionStorage.getItem('userId');
        const userData = await getUserInfo(userId);

        if (userData) {
            userData.profileImageUrl = imgUrl;
            userData.name = name;
            userData.userInfo = userInfo;

            await axios.put(`${endpoints.users}/${userId}`, userData);

            console.log('¡La información del usuario se ha actualizado correctamente!');
            location.reload();
        } else {
            console.error('No se pudo obtener la información del usuario para actualizar.');
        }
    } catch (error) {
        console.error(error);
    }
});

// Función para mostrar la ultima conexion
lastOnline();