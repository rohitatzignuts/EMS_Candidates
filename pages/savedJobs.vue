<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useJobStore } from '~/store/useJobStore'
import { storeToRefs } from 'pinia'
// const jobStore = useJobStore()
// const {savedJobs,test} = storeToRefs(jobStore)
// console.log(test.value);

const router = useRouter()
const savedJobsData = process.client ? localStorage.getItem('savedJobs') : null
const savedJobs = ref(savedJobsData ? JSON.parse(savedJobsData) : [])
</script>

<template>
	<div class="savedJobs">
		<!-- jobs saved by user  -->
		<VContainer>
			<div>
				<!-- go back button  -->
				<VBtn
					variant="text"
					class="text-h6 font-italic px-0"
					prepend-icon="mdi-arrow-left-thin"
					@click="router.go(-1)"
					>back</VBtn
				>
			</div>

			<div class="pt-4">
				<div class="text-h4 font-weight-medium appliedJobsText mb-6">
					<mark class="appliedJobsSpan">Jobs You Have Saved...</mark>
				</div>
				<!-- show saved jobs if more than one  -->
				<div v-if="savedJobs.length > 0" class="appliedJobsContainer">
					<VRow>
						<VCol v-for="job in savedJobs" :id="job.id" cols="12">
							<!-- ApplicationCard component  -->
							<ApplicationCard :job="job" />
						</VCol>
					</VRow>
				</div>
				<!-- show this message if less than one  -->
				<div v-else>
					<p class="text-h6">you haven't saved any jobs yet....</p>
				</div>
			</div>
		</VContainer>
	</div>
</template>

<style scoped>
mark {
	display: inline-block;
	line-height: 0em;
	padding-bottom: 0.5em;
	background-color: rgb(250, 112, 112, 0.75);
}

.savedJobs {
	min-height: calc(100vh - 64px);
}

.appliedJobsContainer {
	height: 75vh;
	overflow-x: hidden;
	overflow-y: scroll;
}

.appliedJobsContainer::-webkit-scrollbar {
	width: 8px;
	/* Width of the scrollbar */
}

.appliedJobsContainer::-webkit-scrollbar-track {
	background: #fefded;
	/* Color of the track */
}

.appliedJobsContainer::-webkit-scrollbar-thumb {
	background: rgb(250, 112, 112, 0.75);
	/* Color of the scrollbar handle */
}

.appliedJobsContainer::-webkit-scrollbar-thumb:hover {
	background: rgb(250, 112, 112, 0.75);
	/* Color of the scrollbar handle on hover */
}
</style>
