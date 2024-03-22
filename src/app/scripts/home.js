import "../styles/home.scss";
import chatImage from "../assets/images/1Login-Register/Textura-forms-fondo.png";
import axios from "axios";
import endpoints from "../services/data";
import toggleModal from "../modules/toggleModal";
import getUserInfo from "../modules/getUserInfo";
import showDefaultOrUserProfileImage from "../modules/showDefaultOrUserProfileImage";
import showPreviewContainer from "../modules/showPreviewContainer";
import initializePage from "../modules/initializePage";
import { getConversation, getDataUser } from "../services/userServices";
import lastOnline from "../modules/lastOnline";
import Swal from "sweetalert2";
// Definir userId como variable global
let userId;
let filtersActive = false;

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

const recentChats = async () => {
  try {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('No se encontró el ID del usuario en el sessionStorage');
      return;
    }

    const urlConversations = endpoints.messages;
    const responseConversations = await axios.get(urlConversations);

    if (responseConversations.status !== 200) {
      console.error('Error al obtener los datos de las conversaciones:', responseConversations.statusText);
      return;
    }

    const conversations = responseConversations.data;
    const chatElements = [];

    for (const chat of conversations) {
      if (chat.senderUser == userId || chat.recipientUser == userId) {
        let otherUserId = chat.senderUser;
        if (chat.senderUser == userId) {
          otherUserId = chat.recipientUser;
        }

        if (!filtersActive) {
          const urlUser = endpoints.getDataUser(otherUserId);
          const responseUser = await axios.get(urlUser);

          if (responseUser.status === 200) {
            const userData = responseUser.data[0];
            const lastMessage = chat.conversations[chat.conversations.length - 1];

            const chatElement = document.createElement('article');
            chatElement.classList.add('home__modal-chat');

            if(lastMessage.sendBy == userId){
              
            if (lastMessage.flag === false) {
              chatElement.innerHTML = `
              <img class="home__modal-chat-img" src="${userData.profileImageUrl}" alt="${userData.name}">
              <section class="home__modal-chat-preview">
                  <span class="home__modal-chat-contact">
                      <h4>${userData.name}</h4>
                      <p>${lastMessage.date}</p>
                  </span>
                  <span class="home__modal-chat-text">
                  <i class="fa-solid fa-check-double" style="color: gray"></i>
                      <p class="home__modal-description">${lastMessage.message}</p>
                  </span>
              </section>
          `;
            } else {
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
            }
              
            } else{
              chatElement.innerHTML = `
              <img class="home__modal-chat-img" src="${userData.profileImageUrl}" alt="${userData.name}">
              <section class="home__modal-chat-preview">
                  <span class="home__modal-chat-contact">
                      <h4>${userData.name}</h4>
                      <p>${lastMessage.date}</p>
                  </span>
                  <span class="home__modal-chat-text">
                      <p class="home__modal-description">${lastMessage.message}</p>
                  </span>
              </section>
          `;
            }

            chatElement.addEventListener('click', function () {
              sessionStorage.setItem('friendId', userData.id);
              location.reload();
            });

            chatElements.push(chatElement);
          }
        }
      }
    }

    const chatsContainer = document.getElementById('recent-chats');
    chatsContainer.innerHTML = '';

    for (const chatElement of chatElements) {
      chatsContainer.appendChild(chatElement);
    }
  } catch (error) {
    console.error('Error al obtener y mostrar los chats del usuario:', error);
  }
};


const searchConversation = async () => {
  try {
    const searchValue = document.querySelector('.home__modal-header-input').value.toLowerCase();

    if (filtersActive) {
      const usersContainer = document.getElementById('available-users');
      usersContainer.innerHTML = '';
      return;
    }

    const urlUsers = endpoints.users;
    const responseUsers = await axios.get(urlUsers);

    if (responseUsers.status !== 200) {
      console.error('Error al obtener los datos de los usuarios:', responseUsers.statusText);
      return;
    }

    const users = responseUsers.data;
    const usersContainer = document.getElementById('available-users');
    usersContainer.innerHTML = '';

  // Obtener el ID del usuario logueado
    const userId = parseInt(sessionStorage.getItem('userId'));


    for (const user of users) {
      const currentUserId = parseInt(user.id);
      if (currentUserId !== userId && (user.name.toLowerCase().includes(searchValue) || user.phoneNumber.toLowerCase().includes(searchValue))) {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
          <img class="user__avatar" src="${user.profileImageUrl}" alt="${user.name}">
          <div class="user__info">
            <h4 class="user__name">${user.name}</h4>
            <p class="user__phone">${user.phoneNumber}</p>
          </div>
          <button class="user__start-conversation-button" data-user-id="${user.id}">Iniciar Conversación</button>
        `;

        userElement.addEventListener('click', function () {
          sessionStorage.setItem('friendId', user.id);
          location.reload();
        });

        usersContainer.appendChild(userElement);

      }
      
    }
  } catch (error) {
    console.error('Error al realizar la búsqueda de usuarios:', error);
  }
};

const toggleFilters = () => {
  filtersActive = !filtersActive;
  recentChats();
  searchConversation();
};

// Llamar a la función para realizar la búsqueda de chats cuando haya un evento de entrada en el campo de búsqueda
document.querySelector('.home__modal-header-input').addEventListener('input', searchConversation);

const recentChatsContainer = document.getElementById('recent-chats');
const availableUsersContainer = document.getElementById('available-users');

function showAvailableUsers() {
  recentChatsContainer.style.display = 'none';
  availableUsersContainer.style.display = 'block';
}

function showRecentChats() {
  recentChatsContainer.style.display = 'block';
  availableUsersContainer.style.display = 'none';
}

document.getElementById('button__show-users').addEventListener('click', function () {
  showAvailableUsers();
});

document.getElementById('button__show-chats').addEventListener('click', function () {
  showRecentChats();
});


//Funcion para pintar los mensajes del chat
const printMessages = async () => {
  try {
    const friendId = sessionStorage.getItem('friendId');
    if (!friendId) {
      console.error('No se encontró el ID del amigo en el sessionStorage');

      const headerConversation = document.querySelector(".home__chat-header")
      headerConversation.style.display = "none"
      const footerConversation = document.querySelector(".home__chat-footer")
      footerConversation.style.display = "none"
      return;
    }

    const conversationData = await getConversation(userId, friendId);
    const chatConversationContainer = document.getElementById('home-chat-conversation');

    const friendUserData = await getDataUser(friendId);
    if (!friendUserData) {
      console.error('No se pudieron obtener los datos del usuario amigo');
      return;
    }

    const openChatData = document.querySelector('.home__chat-header');

    if (friendUserData.flag === true) {
      openChatData.innerHTML = `
      <img src="${friendUserData.profileImageUrl}" alt="${friendUserData.name}"/>
      <div class="home__chat-header-userFriend">
        <h4>${friendUserData.name}</h4>
        <p>En línea</p>
      </div>
      <i class="fa-solid fa-magnifying-glass"></i>
      `;
    } else {
      openChatData.innerHTML = `
      <img src="${friendUserData.profileImageUrl}" alt="${friendUserData.name}"/>
      <div class="home__chat-header-userFriend">
        <h4>${friendUserData.name}</h4>
        <p>Última vez el ${friendUserData.lastOnline}</p>
      </div>
      <i class="fa-solid fa-magnifying-glass"></i>
      `;
    }

    // Iterar sobre los mensajes de la conversación
    conversationData[0].conversations.forEach(message => {

      const messageContainer = document.createElement('div');
      const messageText = document.createElement('p');
      const messageHour = document.createElement('p');
      messageHour.classList.add("hour")
      const icon = document.createElement('i');
      icon.classList.add('fa-solid', 'fa-check-double');

      messageText.textContent = message.message;
      messageHour.textContent = message.hour;

      messageContainer.appendChild(messageText);
      messageContainer.appendChild(messageHour);

      // Asignar la clase correspondiente según el remitente del mensaje
      if (message.sendBy == userId) {
        messageContainer.classList.add('home__chat-message-user');

        messageContainer.appendChild(icon)
        if (!message.flag) {
          icon.style.color = 'gray';
        }

      } else if (message.sendBy == friendId) {
        messageContainer.classList.add('home__chat-message-userFriend');
      }

      chatConversationContainer.appendChild(messageContainer);
    });

  } catch (error) {
    console.error('Error al imprimir los mensajes del chat:', error);
  }
};



// Codigo de Gaby:
// Event Listener para enviar el formulario
document.getElementById('formProfile').addEventListener('submit', async (event) => {
  event.preventDefault();

  const imgUrl = document.getElementById('profileImageUrl').value;
  const name = document.getElementById('name').value;
  const userInfo = document.getElementById('userInfo').value;

  try {
    const userId = sessionStorage.getItem('userId');
    const userData = await getUserInfo(userId);

    if (userData) {
      // Verificar cada campo antes de actualizar
      if (imgUrl.trim() !== "") {
        userData.profileImageUrl = imgUrl;
      }
      if (name.trim() !== "") {
        userData.name = name;
      }
      if (userInfo.trim() !== "") {
        userData.userInfo = userInfo;
      }

      await axios.put(`${endpoints.users}/${userId}`, userData);

      console.log('¡La información del usuario se ha actualizado correctamente!');

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La información del usuario se ha actualizado correctamente!',
        timer: 1500,
        timerProgressBar: false,
      }).then(() => location.reload());
    } else {
      console.error('No se pudo obtener la información del usuario para actualizar.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la información del usuario para actualizar.'
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al actualizar la información del usuario. Por favor, inténtalo de nuevo.'
    });
  }
});

//FUNCION PARA MOSTRAR EL MODAL DE INFO DE PERFIL
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
// Cambiar fecha de la ultima vez
lastOnline();


document.addEventListener("DOMContentLoaded", () => {
  fillUserHeader();
  recentChats();
  printMessages();
});