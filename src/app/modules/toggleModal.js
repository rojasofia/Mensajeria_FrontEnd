//VISUALIZACION MODAL
const toggleModal = (button, modal) => {
  button.addEventListener("click", () => {
    modal.classList.toggle("show");
  });
};

export default toggleModal;