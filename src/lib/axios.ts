import axios from "axios";

export const imdbApi = axios.create({
  baseURL: "https://imdb.iamidiotareyoutoo.com",
  timeout: 8000, // if the app doesn't return in 8 seconds, abort
});
