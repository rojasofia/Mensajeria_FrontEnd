// Importaciones de módulos y servicios
import { getDataForm } from "../modules/getDataForm.js";
import endpoints, { users } from "../services/data.js";
import { getUser } from "../services/userServices.js";
import { createUser } from "../services/registerUsers.js";
import "../styles/style.scss";
import image from "../assets/images/logo-bordeado.png";
import fondoImage from "../assets/images/1Login-Register/Textura-forms-fondo.png";
import Swal from "sweetalert2";

// Configuración del logo
const logoImage = document.getElementById("logo");
logoImage.setAttribute("src", image);
logoImage.classList.add("logo-styling");

// Estilo para el fondo del cuerpo del documento
document.body.style.background = `
  linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
  url(${fondoImage})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundPosition = "center";

// Funciones y eventos relacionados con el formulario de inicio de sesión
const formLogin = document.getElementById("formLogin");

// Función para iniciar sesión
const login = async (userData) => {
  const url = endpoints.getAnUser(userData.phoneNumber, userData.password);
  const userLogged = await getUser(url);
  if (userLogged) {
    // Si el usuario está autenticado correctamente, redirigir a la página de inicio
    window.location.href = "./home.html";
    alert(`Bienvenid@ ${userLogged.name}`);
  } else {
    alert("Credenciales incorrectas");
  }
};

// Evento de envío del formulario de inicio de sesión
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userData = getDataForm(formLogin);
  login(userData);
});

// Funciones y eventos relacionados con la visibilidad de la contraseña
const contrasena = document.getElementById("contrasena");
const iconoOjo = document.getElementById("icon_eye");
// Evento para mostrar u ocultar la contraseña al hacer clic en el ícono del ojo
iconoOjo.addEventListener("click", () => {
  if (contrasena.type === "password") {
    contrasena.type = "text";
    iconoOjo.className = "fa-solid fa-eye-slash";
  } else {
    contrasena.type = "password";
    iconoOjo.className = "fa-solid fa-eye";
  }
});

// Funciones y eventos relacionados con el registro de usuarios
const contrasenaReg = document.getElementById("password");
const iconoOjo2 = document.getElementById("icon_eye2");

// Evento para mostrar u ocultar la contraseña al hacer clic en el ícono del ojo
iconoOjo2.addEventListener("click", () => {
  if (contrasenaReg.type === "password") {
    contrasenaReg.type = "text";
    iconoOjo2.className = "fa-solid fa-eye-slash";
  } else {
    contrasenaReg.type = "password";
    iconoOjo2.className = "fa-solid fa-eye";
  }
});

// Función para mostrar mensajes de error en el formulario
function showErrorMessage(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.innerText = message;
  errorElement.style.display = "block";
}

// Evento que se ejecuta cuando se carga el documento
document.addEventListener("DOMContentLoaded", function () {
  // Función para cambiar a la vista de registro
  function toggleLogin() {
    document.getElementById("login-toggle").classList.add("active");
    document.getElementById("signup-toggle").classList.remove("active");
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }

  // Función para cambiar a la vista de inicio de sesión
  function toggleSignup() {
    document.getElementById("login-toggle").classList.remove("active");
    document.getElementById("signup-toggle").classList.add("active");
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
  }

  // Evento para cambiar a la vista de registro
  document
    .getElementById("signup-toggle")
    .addEventListener("click", function () {
      this.classList.add("active");
      document.getElementById("login-toggle").classList.remove("active");
      toggleSignup();
      document.getElementById("login-toggle").classList.add("signup-mode");
    });

  // Evento para cambiar a la vista de inicio de sesión
  document
    .getElementById("login-toggle")
    .addEventListener("click", function () {
      this.classList.add("active");
      document.getElementById("signup-toggle").classList.remove("active");
      toggleLogin();
      document.getElementById("login-toggle").classList.remove("signup-mode");
    });

  // Evento para validar y procesar el registro de usuario
  document.querySelector(".btn.signup").addEventListener("click", function () {
    resetFormStyles();

    const formRegister = document.getElementById("formRegister");

    formRegister.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newUser = getDataForm(formRegister);

      newUser.creationDate = new Date();
      newUser.validate = false;
      console.log(newUser);

      // Validar los campos del formulario antes de enviar la solicitud de creación de usuario
      const name = document.getElementById("name").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const password = document.getElementById("password").value;
      const profileImageUrl = document.getElementById("profileImageUrl").value;

      if (!isValidName(name)) {
        showErrorMessage(
          "error_name",
          "El nombre debe contener máximo 40 letras y no debe contener caracteres especiales."
        );
        showSwalError();
        return;
      }

      if (!isValidPhone(phoneNumber)) {
        showErrorMessage(
          "error_phone",
          "El teléfono debe contener 10 dígitos."
        );
        showSwalError();
        return;
      }

      if (!isValidPassword(password)) {
        showErrorMessage(
          "error_password",
          "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
        );
        showSwalError();
        return;
      }

      if (!isValidImageURL(profileImageUrl)) {
        showErrorMessage(
          "error_profileImageUrl",
          "La URL de la imagen no es válida."
        );
        showSwalError();
        return;
      }

      // Si todos los campos son válidos, entonces creamos el usuario
      const response = await createUser(newUser);

      if (response.status === 201) {
        users.push(response.data);
        console.log("El usuario ha sido creado exitosamente");
        showSuccessAlert();
      } else {
        console.log("Ha ocurrido un error al crear el usuario");
        alert("Ha ocurrido un error al crear el usuario");
      }
    });
  });
});

// Funciones para validar campos del formulario
function isValidName(name) {
  return name.match(/^[a-zA-ZÀ-ÿ\s]{1,40}$/);
}

function isValidPhone(phoneNumber) {
  return phoneNumber.match(/^\d{10}$/);
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

// Función para restablecer estilos de formulario
function resetFormStyles() {
  const errorElements = document.querySelectorAll(".form__input-error");
  errorElements.forEach((element) => {
    element.style.display = "none";
  });
}

// Función para mostrar mensaje de éxito al registrar usuario
function showSuccessAlert() {
  Swal.fire({
    title: "Se ha registrado correctamente.",
    width: 600,
    padding: "3em",
    color: "#716add",
    confirmButtonColor: "#716add",
    confirmButtonText: "Continuar",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("name").value = "";
      document.getElementById("phoneNumber").value = "";
      document.getElementById("password").value = "";
      document.getElementById("profileImageUrl").value = "";
      window.location.href = "./index.html";
    }
  });
}

// Función para mostrar mensaje de error con SweetAlert
function showSwalError() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Algo salió mal. Ingresa correctamente los campos.",
  });
}
