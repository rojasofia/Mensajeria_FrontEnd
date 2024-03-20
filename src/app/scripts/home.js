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

// Definir userId como variable global
let userId;

// Objeto para almacenar usuarios únicos
const uniqueUsers = {};

// Variable para almacenar el estado de los filtros
let filtersActive = false;

const chatBackground = document.getElementById("home-chat-conversation");
chatBackground.setAttribute("src", chatImage);
chatBackground.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.300)),
url(${chatImage})`;

const fillUserHeader = async () => {
  try {
    userId = sessionStorage.getItem('userId');

    if (!userId) {
      console.error('No se encontró el ID del usuario en el almacenamiento local');
      return;
    }

    const url = endpoints.getDataUser(userId);
    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error('Error al obtener los datos del usuario:', response.statusText);
      return;
    }

    const userData = response.data[0];

    if (userData.profileImageUrl) {
      const profileContainer = document.getElementById('profile');
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

const searchUsersToStartConversation = async () => {
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

    for (const user of users) {
      if (user.name.toLowerCase().includes(searchValue) || user.phoneNumber.toLowerCase().includes(searchValue)) {
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
  searchUsersToStartConversation();
};

document.querySelector('.home__modal-header-input').addEventListener('input', searchUsersToStartConversation);

document.addEventListener("DOMContentLoaded", () => {
  fillUserHeader();
  recentChats();
});

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

document.getElementById('button__show-users').addEventListener('click', function() {
  showAvailableUsers();
});

document.getElementById('button__show-chats').addEventListener('click', function() {
  showRecentChats();
});

//FUNCION PARA MOSTRAR EL MODAL DE INFO DE PERFIL
const profileButton = document.getElementById("profile");
const modal = document.querySelector(".section__modal-container");
const closeButton = document.getElementById("closeModal");
const containerProfile = document.getElementById("containerProfile");

toggleModal(profileButton, modal);
toggleModal(closeButton, modal);
