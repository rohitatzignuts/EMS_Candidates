import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
	const loginToken = process.client ? localStorage.getItem('loginToken') : null
	const isAuthenticated = ref<boolean>(loginToken !== null)

	return {
		loginToken,
		isAuthenticated
	}
})
