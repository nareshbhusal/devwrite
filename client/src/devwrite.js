import axios from 'axios';
axios.defaults.withCredentials = true;
const { URL } = process.env;

const devWrite= axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: { crossDomain: true, 'Content-Type': 'application/json' },
})
devWrite.defaults.withCredentials = true

export default devWrite;