import showDefaultOrUserProfileImage from "./showDefaultOrUserProfileImage";

const initializePage = (userId) => {
    userId = sessionStorage.getItem('userId');
    showDefaultOrUserProfileImage(userId);
  }

  export default initializePage;