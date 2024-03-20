import axios from "axios";
import endpoints from "../services/data";

const lastOnline = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const logoutButton = document.getElementById("logoutButton");
    
      logoutButton.addEventListener("click", async (event) => {
          event.preventDefault();
    
          // Obtener el ID del usuario de sessionStorage
          const userId = sessionStorage.getItem('userId');
    
          if (!userId) {
              console.error('No se encontró el ID del usuario en el sessionStorage');
              return;
          }
    
          try {
              // Obtener todos los datos del usuario
              const url = endpoints.getDataUser(userId);
              const response = await axios.get(url);
    
              if (response.status !== 200) {
                  console.error('Error al obtener los datos del usuario:', response.statusText);
                  return;
              }
    
              const userData = response.data[0];
    
              // Actualizar la propiedad lastOnline del usuario
              userData.lastOnline = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    
              // Realizar la solicitud PUT para actualizar los datos del usuario
              const updateUserUrl = `${endpoints.users}/${userId}`;
              const updateResponse = await axios.put(updateUserUrl, userData);
    
              console.log('Datos del usuario actualizados correctamente:', updateResponse.data);
    
              // Redireccionar al usuario a la página de inicio de sesión
              window.location.href = "./index.html";
          } catch (error) {
              console.error("Error al cerrar sesión:", error);
          }
      });
    });
  }

  export default lastOnline;