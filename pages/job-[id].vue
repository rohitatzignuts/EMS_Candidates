<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import axios from 'axios'

type jobType = {
	title: string
	description: string
	location: string
	pay: string
	company_name: string
}

const router = useRoute()
const mainRouter = useRouter()
const jobId = ref<number | string>(router.params.id)
const jobDetails = ref<jobType>({})
const loginToken = process.client ? localStorage.getItem('loginToken') : null

const fetchJobById = async () => {
	try {
		const response = await axios.get(`/job/${jobId.value}`, {
			headers: {
				Authorization: `Bearer ${loginToken}`
			}
		})
		jobDetails.value = response.data.data
	} catch (error: any) {
		if (error.response) {
			useNuxtApp().$toast.info(`${error.response.data.message}`)
		} else {
			useNuxtApp().$toast.info(`Error : ${error}`)
		}
	}
}

// watch for the change in the job id
watchEffect(() => {
	jobId.value
})

// fetch the the jobs with id when this component mounts 
onMounted(() => {
	fetchJobById()
})
</script>

<template>
	<div class="jobOverview">
		<div>
			<VContainer>
				<VBtn
					variant="text"
					class="text-h6 font-italic px-0"
					prepend-icon="mdi-arrow-left-thin"
					@click="mainRouter.go(-1)"
					>back</VBtn
				>
			</VContainer>
		</div>
		<div>
			<JobOverview :job="jobDetails" />
		</div>
	</div>
</template>

<style scoped>
/* styles for .jobOverview container  */
.jobOverview {
	height: calc(100vh - 64px);
}
</style>
