import axios from "axios";

export default defineNuxtPlugin( async () => {
    // const token = localStorage.getItem('token')
    axios.defaults.baseURL = "http://127.0.0.1:8000/api/"
    axios.interceptors.request.use(function (config) {
        config.headers['token'] = "7|aJ9PIQ7txyMKWu4eFnU8Tjq8a2BwzQfeAGyYBCIK1a42a8e9"
        return config;
    });
    return {
        provide : {
            axios : axios,
        }
    }
})