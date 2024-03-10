import { getDataForm } from '../modules/getDataForm.js';
import endpoints from '../services/data.js';
import { getUser } from '../services/userServices.js';
import "../styles/style.scss";
import image from "../assets/images/logo-bordeado.png";
import fondoImage from "../assets/images/1Login-Register/Textura-forms-fondo.png";
import Swal from 'sweetalert2';

const logoImage = document.getElementById("logo");
logoImage.setAttribute("src", image);

document.body.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.300)),
url(${fondoImage})`;
//document.body.style.backgroundImage = `url(${fondoImage})`
//document.body.style.filter = 'brightness(0.5)'; se aplica filtro a todo

//////// ----------------FUNCIONES FORM LOGIN

//-----Declaración de variables----

const formLogin = document.getElementById("formLogin");

//-----Declaración de funciones----
const login = async (userData) => {
  const url = endpoints.getAnUser(userData.phoneNumber, userData.password);
  const userLogged = await getUser(url);
  if (userLogged) {
    window.location.href = "./home.html";
    alert(`Bienvenid@ ${userLogged.name}`);
  } else {
    alert("Credenciales incorrectas");
  }
};
//------Ejecutar-----

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userData = getDataForm(formLogin);
  login(userData);
});

//ver contraseña

const contrasena = document.getElementById("contrasena");
const verContrasena = document.getElementById("ver_contrasena");

verContrasena.addEventListener("click", () => {
  if (contrasena.type === "password") {
    contrasena.type = "text";
  } else {
    contrasena.type = "password";
  }
});



document.addEventListener("DOMContentLoaded", function () {
  // Funciones para activar y desactivar el login/sing Up
  function toggleLogin() {
    document.getElementById("login-toggle").classList.add("active");
    document.getElementById("signup-toggle").classList.remove("active");
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }

  function toggleSignup() {
    document.getElementById("login-toggle").classList.remove("active");
    document.getElementById("signup-toggle").classList.add("active");
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
  }

  // Agregar eventos de clic para cambiar el color al hacer clic en "Sign Up" o "Login"
  document.getElementById("signup-toggle").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("login-toggle").classList.remove("active");
    toggleSignup();
    document.getElementById("login-toggle").classList.add("signup-mode");
  });

  document.getElementById("login-toggle").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("signup-toggle").classList.remove("active");
    toggleLogin();
    document.getElementById("login-toggle").classList.remove("signup-mode");
  });

  // Agregar un evento de clic al botón de registro
  document.querySelector(".btn.signup").addEventListener("click", function () {
    // Reiniciar los estilos y mensajes de error
    resetFormStyles();
    
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const url = document.getElementById("url").value;
    
        if (!name.match(/^[a-zA-ZÀ-ÿ\s]{1,40}$/)) {
          showErrorMessage("error_name", "El nombre debe contener maximo 30 letras");
        }
    
        if (!phone.match(/^\d{10}$/)) {
          showErrorMessage("error_phone", "El telefono debe contener hasta 14 números");
        }
    
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)) {
          showErrorMessage("error_password", "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial");
        }
    
        if (!isValidImageURL(url)) {
          showErrorMessage("error_url", "La imagen debe ser formato .jpg, .jpeg, .png o .gif");
        }
    
        // Verificar si todos los campos son válidos
        if (isValidName(name) && isValidPhone(phone) && isValidPassword(password) && isValidImageURL(url)) {
          // Si todos los campos son válidos, mostrar el SweetAlert
          showSuccessAlert();
        }
      });
    
      function isValidName(name) {
        return name.match(/^[a-zA-ZÀ-ÿ\s]{1,40}$/);
      }
    
      function isValidPhone(phone) {
        return phone.match(/^\d{10}$/);
      }
    
      function isValidPassword(password) {
        return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/);
      }
    
      function isValidImageURL(input) {
        try {
          new URL(input);
          return true;
        } catch (error) {
          return false;
        }
      }
    
      function showSuccessAlert() {
        Swal.fire({
          title: "Se ha registrado correctamente.",
          width: 600,
          padding: "3em",
          color: "#716add",
          
        });
      }
    
      function resetFormStyles() {
        const errorElements = document.querySelectorAll(".form__input-error");
        errorElements.forEach((element) => {
          element.style.display = "none";
        });
      }
    
      function showErrorMessage(errorId, errorMessage) {
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = "block";
    
        if (window.getComputedStyle(errorElement).display === 'block') {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }
    });
    

// codigo de la profe

// //Declaración de variables y constantes
// const register = document.getElementById("register");
// const home = document.getElementById("home");
// const pages = [login, register, home];

// const goToRegister = document.getElementById("goToRegister");
// const goToLogin = document.getElementById("goToLogin");

// //Función para mostrar vista
// const showPage = (namePage, pages)=>{
//     localStorage.setItem("page", JSON.stringify(namePage));
//     pages.forEach(element=>{
//         if(element.id ==namePage){
//             element.style.display = "block";
//         }else{
//             element.style.display = "none";
//         }
//     })
// }

// //Esconder las vistas
// register.style.display= "none";
// home.style.display = "none"
// document.addEventListener("DOMContentLoaded",()=>{
//     const currentPage = JSON.parse(localStorage.getItem("page"))||"login"
//     showPage(currentPage, pages);
// })
// goToRegister.addEventListener("click",()=>{
//     showPage(register.id, pages);
// })
// goToLogin.addEventListener("click",()=>{
//     showPage(login.id, pages);
// })
