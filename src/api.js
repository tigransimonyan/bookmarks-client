import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.bookmarks.am/api"
      : "https://api.bookmarks.am/api",
});

export default instance;
