import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useJobStore = defineStore('jobs', () => {
	const trendingJobs = ref<Array<object>>([]) // array to save trending jobs
	const allJobs = ref<Array<object>>([]) // array to save all the jobs
	const userAppliedJobs = ref<Array<object>>([]) // array to save jobs user has applied for

	// get loginToken from the localstorage
	const loginToken = process.client ? localStorage.getItem('loginToken') : null
	// get userEmail from the localstorage
	const userEmail = process.client ? localStorage.getItem('userEmail') : null
	// get savedJobs from the localstorage
	const savedJobs = ref<any[]>([])

	// fetch trending jobs
	const getTrendingJobs = async () => {
		try {
			const response = await axios.get('jobs', {
				params: {
					trending: 'trending'
				}
			})
			trendingJobs.value = response.data.data
		} catch (error) {
			console.log(error)
		}
	}

	// fetch all the jobs
	const getAllJobs = async () => {
		try {
			const response = await axios.get('jobs')
			allJobs.value = response.data.data
		} catch (error) {
			console.log(error)
		}
	}

	// fetch the jobs user has applied for
	const getUserAppliedJobs = async () => {
		try {
			const response = await axios.get('applications/status', {
				params: {
					userEmail
				},
				headers: {
					Authorization: `Bearer ${loginToken}`
				}
			})
			console.log(response.data)
			userAppliedJobs.value = response.data.data
		} catch (error) {
			console.log(error)
		}
	}

	// save the jobs to localstorage
	const handleJobSave = (job: any) => {
		try {
			const jobId = job.id
			// check for duplicate entries
			if (savedJobs.value.some((savedJob: any) => savedJob?.id === jobId)) {
				useNuxtApp().$toast.info('Job already saved! 👍')
			} else {
				// add new job
				savedJobs.value.push(job)
				if (process.client) {
					localStorage.setItem('savedJobs', JSON.stringify(savedJobs.value))
				}
				useNuxtApp().$toast.success('Job saved successfully! 🙌')
			}
		} catch (error) {
			useNuxtApp().$toast.error('Failed to save the job 😓')
		}
	}

	// remove saved jobs from localstorage
	const handleJobRemove = (id: number) => {
		try {
			// find the clicked job via id
			savedJobs.value = savedJobs.value.filter((job: any) => job.id !== id)
			if (process.client) {
				// store new savedJobs in the localstorage
				localStorage.setItem('savedJobs', JSON.stringify(savedJobs.value))
			}
		} catch (error) {
			useNuxtApp().$toast.error('Failed to remove the job 😓')
		}
	}

	return {
		getTrendingJobs,
		getAllJobs,
		handleJobSave,
		trendingJobs,
		allJobs,
		getUserAppliedJobs,
		handleJobRemove,
		savedJobs,
		userAppliedJobs
	}
})
