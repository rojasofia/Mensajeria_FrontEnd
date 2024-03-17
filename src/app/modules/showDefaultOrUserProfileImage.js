import getUserInfo from "./getUserInfo";


const showDefaultOrUserProfileImage = async (userId) => {
    if (userId) {
        const userData = await getUserInfo(userId);
        if (userData && userData.profileImageUrl) {
            previewImg.src = userData.profileImageUrl;
        } else {
            previewImg.src = "https://i.pinimg.com/736x/70/85/54/7085548f3d0372a08aea0291ddcee895.jpg";
        }
    } else {
        console.error('No se encontró el ID del usuario en el sessionStorage.');
    }
  };

  export default showDefaultOrUserProfileImage;