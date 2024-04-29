import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useJobStore = defineStore('jobs', () => {
	const trendingJobs = ref<Array<object>>([]) // array to save trending jobs
	const allJobs = ref<Array<object>>([]) // array to save all the jobs
	const userAppliedJobs = ref<Array<object>>([]) // array to save jobs user has applied for
	const savedJobsArray = ref<Array<object>>([]) // array to save jobs user has saved

	// get loginToken from the localstorage
	const loginToken = process.client ? localStorage.getItem('loginToken') : null
	// get userEmail from the localstorage
	const userEmail = process.client ? localStorage.getItem('userEmail') : null
	// get savedJobs from the localstorage
	const savedJobsData = process.client
		? localStorage.getItem('savedJobs')
		: null
	const savedJobs = ref(savedJobsData ? JSON.parse(savedJobsData) : [])

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
	const handleJobSave = (job: object) => {
		try {
			const jobId = job.id
			// check for duplicate entries
			if (savedJobsArray.value.some((savedJob) => savedJob?.id === jobId)) {
				useNuxtApp().$toast.info('Job already saved! 👍')
			} else {
				// add new job
				savedJobsArray.value.push(job)
				if (process.client) {
					localStorage.setItem(
						'savedJobs',
						JSON.stringify(savedJobsArray.value)
					)
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
			const index = savedJobs.value.findIndex((job) => job.id === id)
			// if found
			if (index !== -1) {
				// remove that job from the savedJobs array
				savedJobs.value.splice(index, 1)
				localStorage.setItem('savedJobs', JSON.stringify(savedJobs.value))
				// Trigger reactivity here by assigning a new value to savedJobs.value
				savedJobs.value = [...savedJobs.value]
			}
		} catch (error) {
			useNuxtApp().$toast.error('Failed to remove the job 😓')
		}
	}

	return {
		getTrendingJobs,
		savedJobsArray,
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
