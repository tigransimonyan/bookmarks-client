import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.bookmarks.am/api'
      : 'http://localhost:9003/api',
});

export default instance;
