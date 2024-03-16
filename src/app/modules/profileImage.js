import axios from "axios";
import endpoints from "../services/data";

export const changeImgProfile = () => {
    let inputUrl = document.getElementById("profileImageUrl");
    let imgUrl = inputUrl.value;

    if (imgUrl.trim() !== "") {
        let picture = document.getElementById("previewImg");
        picture.src = imgUrl;

        // Guardamos en el mini back
        try {
            // Obtener el ID del sessionStorage
            const userId = sessionStorage.getItem('userId');
        
            if (userId) {
                console.log('ID del usuario:', userId);
    
                axios.put(`${endpoints.users}/${userId}`, { profileImageUrl: imgUrl })
                    .then(response => {
                        console.log("URL de imagen actualizada en el servidor:", response.data);
                    })
            } else {
                console.error('No se encontró un ID de usuario en el sessionStorage.');
            }
        } catch (error) {
            console.error('Error al obtener el ID del usuario del sessionStorage:', error);
        }
    }
}        