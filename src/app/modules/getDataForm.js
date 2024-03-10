export const getDataForm = (formLogin) => {
    const dataForm = {};
    const formData = new FormData(formLogin);
  
    for (const [key, value] of formData.entries()) {
      dataForm[key] = value;
    }
  
    return dataForm;
  };
  