import axios from 'axios';

const apiService = axios.create({
    baseURL: 'https://5fc9346b2af77700165ae514.mockapi.io/',
    timeout: 1000,
    // headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
});


export default apiService;