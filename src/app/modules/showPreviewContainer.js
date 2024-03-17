import showDefaultOrUserProfileImage from "./showDefaultOrUserProfileImage";

const showPreviewContainer = (inputImgUrl, preview) => {
    inputImgUrl.addEventListener('input', (event) => {
      const imgUrl = event.target.value;
      if (imgUrl.trim() !== "") {
        preview.src = imgUrl;
      } else {
          const userId = sessionStorage.getItem('userId');
          showDefaultOrUserProfileImage(userId);
      }
  });

  preview.addEventListener('click', () => {
    inputImgUrl.focus();
});

  }

  export default showPreviewContainer;