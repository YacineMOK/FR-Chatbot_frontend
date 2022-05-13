import axios from 'axios';

const API = axios.create({
    withCredentials: true,
    // baseURL: ( process.env.DEV ) ? 'https://my.qatent.com:8000/' : 'https://my.qatent.com:8000/',
    baseURL: process.env.DEV ? 'http://127.0.0.1:8000/' : 'http://127.0.0.1:8000/',
  });
  axios.defaults.baseURL = process.env.DEV? 'http://127.0.0.1:8000/' : 'http://127.0.0.1:8000/';
  
  export default {
    getResponse(data) {
        console.log(data);
        return API.post('v1/api/chatbot/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
  }