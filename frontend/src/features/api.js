// Development
export const url = "http://localhost:8000/api/v1";
// Production
//export const url =  "https://chagest-eshop.herokuapp.com/api/v1/";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  };
  return headers;
};
