// plugins/axios.js
import axios from 'axios'

export default defineNuxtPlugin(async () => {
	axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
	axios.interceptors.request.use(function (config) {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers['token'] = token
		}
		return config
	})
})
