// printInfoProfile.js
import { changeImgProfile } from "./profileImage";
import endpoints from "../services/data";
import axios from "axios";

const printInfoProfile = (button, container) => {
  button.addEventListener("click", () => {
    container.innerHTML = "";
    container.innerHTML = `
      <form id="formProfile"  class="modal__form">
        <div class="modal__form-img"> 
          <h3>Cambiar imagen</h3>  
          <label for="inputImg">
            <img id="previewImg" src="" alt="Imagen de perfil">
            <input id="profileImageUrl" class="form-input" name="profileImageUrl" type="url" placeholder="https://miPerfil/8f5e52.jpg" required/>
          </label>  
        </div>

        <div class="modal__form-infoUser">
          <label for="name">
            Tu nombre
            <input id="name" name="name" type="text">
            <i class="fa-solid fa-pen-to-square"></i>
          </label>
          <label for="userInfo">
            Tu descripcion
            <input id="userInfo" name="userInfo" type="text">
            <i class="fa-solid fa-pen-to-square"></i>
          </label>
        </div>

        <div id="buttons" class="modal__form-buttons">
          <input type="submit" value="Aceptar Cambios">
          <button>Cerrar Sesión</button>
        </div>
      </form>
    `;

    // Al "escuchar" los cambios en los inputs, llama a su funcion respectiva
    document
      .getElementById("profileImageUrl")
      .addEventListener("change", changeImgProfile);

    try {
      const userId = sessionStorage.getItem("userId");

      if (userId) {
        // Traemos la info del user por el ID
        axios.get(endpoints.getDataUser(userId)).then((response) => {
          // Obtener los datos del usuario actual, comparando el userId con el id de la lista
          const userData = response.data.find(
            (user) => user.id === parseInt(userId)
          );

          // Si es el mismo id y hay una propiedad llamada "profileImageUrl"
          if (userData && userData.profileImageUrl) {
            // Imprimimos la img en la pre-visualización
            const img = document.getElementById("previewImg");
            img.src = userData.profileImageUrl;
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
};

export default printInfoProfile;
