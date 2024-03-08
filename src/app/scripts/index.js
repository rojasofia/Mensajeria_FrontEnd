import "../styles/style.scss";
import image from "../assets/images/logo-bordeado.png";
import fondoImage from "../assets/images/1Login-Register/Textura-forms-fondo.png";

const logoImage = document.getElementById("logo");
logoImage.setAttribute("src", image);

document.body.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.300)),
url(${fondoImage})`;
//document.body.style.backgroundImage = `url(${fondoImage})`
//document.body.style.filter = 'brightness(0.5)'; se aplica filtro a todo


//funcion para activar y desactivar el login/sing Up
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
  
  // Agregar un evento de clic para cambiar el color al hacer clic en "Sign Up"
  document.getElementById("signup-toggle").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("login-toggle").classList.remove("active");
    toggleSignup();
    document.getElementById("login-toggle").classList.add("signup-mode");
  });
  
  // Agregar un evento de clic para cambiar el color al hacer clic en "Login"
  document.getElementById("login-toggle").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("signup-toggle").classList.remove("active");
    toggleLogin();
    document.getElementById("login-toggle").classList.remove("signup-mode");
  });
// //Declaración de variables y constantes
const expressions = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  phone: /^\d{10}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
  url: /\.(jpg|jpeg|png|gif)$/i,
};

const fields = {
    name: false,
    phone: false,
    password: false,
    url: false,
 
};

//agregar sweetalert
const showErrorMessage = () => {
    document
      .getElementById("form-Mesaage")
      .classList.add("form__Mesaage-activ");
  };

  const hideMessageError = () => {
    document
      .getElementById("form-Mesaage")
      .classList.remove("form__Mesaage-activ");
  };

const validateForm = (e) => {
  switch (e.target.name) {
    case "name":
        validateField(expressions.name, e.target, "name");
      break;
    case "phone":
        validateField(expressions.phone, e.target, "phone");
      break;
    case "password":
        validateField(expressions.password, e.target, "password");
      break;
    case "url":
        validateField(expressions.url, e.target, "url");
      break;
    
  }
};

const validateField = (expresion, input, field) => {
    const grupField = document.getElementById(`group_${field}`);
    const iconStateField = grupField.querySelector("i");
    const mensageError = grupField.querySelector(".form__input-error");

    if (expresion.test(input.value)) {
      grupField.classList.remove("form__group-incorrect");
      grupField.classList.add("form__group-correct");
      iconStateField.classList.add("fa-check-circle");
      iconStateField.classList.remove("fa-solid fa-check");
      mensageError.classList.remove("form__input-error-activ");
      fields[field] = true;
    } else {
      grupField.classList.add("form__group-incorrect");
      grupField.classList.remove("form__group-correct");
      iconStateField.classList.add("fa-times-circle");
      iconStateField.classList.remove("fa-solid fa-check");
      mensageError.classList.add("form__input-error-activ");
      fields[field] = false;

      showErrorMessage();
    }
// Validar longitud específica para algunos campos
if (
    field === "phone" &&
    (input.value.length <= 14)
  ) {
    grupField.classList.add("form__group-incorrect");
    grupField.classList.remove("form__group-correct");
    iconStateField.classList.add("fa-times-circle");
    iconStateField.classList.remove("fa-solid fa-check");
    mensageError.classList.add("form__input-error-activ");
    fields[field] = false;

    showErrorMessage();
  } else if (
    field === "phone" &&
    input.value.length >= 14
  ) {
    // Se añade esta condición para corregir la validación de longitud para el campo "telefono"
    grupField.classList.add("form__group-incorrect");
    grupField.classList.remove("form__group-correct");
    iconStateField.classList.add("fa-times-circle");
    iconStateField.classList.remove("fa-solid fa-check");
    mensageError.classList.add("form__input-error-activ");
    fields[field] = true;
  }

  if (
    field === "password" 
  ) {
    grupField.classList.add("form__group-incorrect");
    grupField.classList.remove("form__group-correct");
    iconStateField.classList.add("fa-times-circle");
    iconStateField.classList.remove("fa-solid fa-check");
    iconStateField.style.color = "red";
    mensageError.classList.add("form__input-error-activ");
    fields[field] = false;

    showErrorMessage();
  } else if (
    field === "password"
  ) {
    // Se añade esta condición para corregir la validación de longitud para el campo "password"
    grupField.classList.add("form__group-incorrect");
    grupField.classList.remove("form__group-correct");
    iconStateField.classList.add("fa-times-circle");
    iconStateField.classList.remove("fa-solid fa-check");
    mensageError.classList.add("form__input-error-activ");
    fields[field] = true;
    showErrorMessage()
  }

 // Ocultar mensaje de error si todos los campos son correctos
 if (
    field.name &&
    field.phone &&
    field.password &&
    field.url 
    
  ) {
    hideMessageError();
  }
};


form.addEventListener("submit", function (event) {
  event.preventDefault();
  hideMessageError();

  // Obtener los valores de los campos del formulario
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const url = document.getElementById("url").value;
}),




// Agrega los manejadores de eventos después de cargar el DOM
document.getElementById("login-toggle").addEventListener("click", toggleLogin);
document
  .getElementById("signup-toggle")
  .addEventListener("click", toggleSignup);

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
