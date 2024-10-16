import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',  // Ensure this matches your Flask server's URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
