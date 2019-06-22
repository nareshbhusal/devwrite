import axios from 'axios';
axios.defaults.withCredentials = true;

const devWrite= axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
    headers: { crossDomain: true, 'Content-Type': 'application/json' },
})
devWrite.defaults.withCredentials = true

export default devWrite;