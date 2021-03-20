import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.bookmarks.am/api'
      : 'http://localhost:9003/api',
});
