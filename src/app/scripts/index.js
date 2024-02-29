import "../styles/style.scss";

//Declaración de variables y constantes
const register = document.getElementById("register");
const home = document.getElementById("home");
const login = document.getElementById("login");
const pages = [login, register, home];

const goToRegister = document.getElementById("goToRegister");
const goToLogin = document.getElementById("goToLogin");


//Función para mostrar vista
const showPage = (namePage, pages)=>{
    localStorage.setItem("page", JSON.stringify(namePage));    
    pages.forEach(element=>{
        if(element.id ==namePage){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
}


//Esconder las vistas
register.style.display= "none";
home.style.display = "none"
document.addEventListener("DOMContentLoaded",()=>{
    const currentPage = JSON.parse(localStorage.getItem("page"))||"login"
    showPage(currentPage, pages);
})
goToRegister.addEventListener("click",()=>{
    showPage(register.id, pages);
})
goToLogin.addEventListener("click",()=>{
    showPage(login.id, pages);
})