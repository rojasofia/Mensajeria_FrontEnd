import "../styles/style.scss";
import image from "../assets/images/LOGO.png";

const logoImage = document.getElementById("logo");
logoImage.setAttribute("src", image);

// //Declaración de variables y constantes



function toggleLogin() {
    document.getElementById("login-toggle").style.backgroundColor = "#511684";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.backgroundColor = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}
function toggleSignup() {
    document.getElementById("login-toggle").style.backgroundColor = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.backgroundColor = "#511684";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}
// Agrega los manejadores de eventos después de cargar el DOM
document.getElementById("login-toggle").addEventListener("click", toggleLogin);
document.getElementById("signup-toggle").addEventListener("click", toggleSignup);

// Inicializa el formulario de registro al cargar la página













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



