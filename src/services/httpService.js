import axios from "axios";
import { toast } from "react-toastify";
//import auth from "./authService";
//import Raven from "raven-js";

//removing this line and creating new func setJwt, as httpservice n authservice r bdirectional
//axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // console.log("Logging the error", error);
    // Raven.captureException(error);
    toast("unexpected error occurred");
  }
  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
