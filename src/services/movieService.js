import http from "./httpService";
import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";
export function getMovies() {
  return http.get(apiEndPoint);
}
export function deleteMovies(movieID) {
  return http.delete(apiEndPoint + "/" + movieID);
}
export function getMovie(id) {
  return http.get(apiEndPoint + "/" + id);
}
export function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    delete body.id;
    return http.put(apiEndPoint + "/" + movie.id, body);
  }
  return http.post(apiEndPoint, movie);
}
