export const getDataForm = (formLogin, formRegister) => {
    const dataForm = {};
    const formData = new FormData(formLogin, formRegister);
  
    for (const [key, value] of formData.entries()) {
      dataForm[key] = value;
    }
  
    return dataForm;
  };
  