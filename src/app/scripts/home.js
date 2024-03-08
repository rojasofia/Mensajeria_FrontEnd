import "../styles/home.scss";
import logo from "../assets/images/logo-bordeado.png";
import chatImage from "../assets/images/1Login-Register/Textura-forms-fondo.png";


const chatBackground = document.getElementById("home-chat-conversation");

chatBackground.setAttribute("src", chatImage);

chatBackground.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.300)),
url(${chatImage})`


const logoHome = document.getElementById("logo-home");
logoHome.setAttribute("src", logo);


