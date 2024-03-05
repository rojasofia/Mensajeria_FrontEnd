import "../styles/style.scss";

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



function toggleSignup() {
    document.getElementById("login-toggle").style.backgroundColor = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
  }
  
  function toggleLogin() {
    document.getElementById("login-toggle").style.backgroundColor = "#57B846";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.backgroundColor = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }