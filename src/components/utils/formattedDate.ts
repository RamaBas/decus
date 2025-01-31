// Hook para formatear una fecha en dd/MM/AAAA
const FormattedDate = (formatedDate: Date) => {
    const formatDate = (date: Date) => {
      if (!(date instanceof Date)) {
        throw new Error("El argumento debe ser una instancia de Date");
      }
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
  
    return formatDate(formatedDate); // Devuelve la función de formateo
  };
  
  export default FormattedDate;