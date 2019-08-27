import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-c4393.firebaseio.com/'
});

export default instance;
