<script setup lang="ts">
import { onMounted } from 'vue'
import { useJobStore } from '../store/useJobStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const jobStore = useJobStore()
const { allJobs } = storeToRefs(jobStore)
const { getAllJobs, handleJobSave } = jobStore

// fetch the all the jobs when this component mounts 
onMounted(() => {
	getAllJobs()
})
</script>

<template>
	<div>
		<div id="trendingJobs">
			<VContainer>
				<div>
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
						<mark class="appliedJobsSpan">All Jobs...</mark>
					</div>
					<div v-if="allJobs.length > 0" id="allJobsContainer">
						<VRow class="text-center">
							<VCol v-for="job in allJobs" :key="job.id" md="6" lg="6" sm="12">
								<FeaturedJobsCard
									:job="job"
									@handle-save-job="handleJobSave(job)"
								/>
							</VCol>
						</VRow>
					</div>
					<div v-else>
						<p class="text-h6">No jobs for now 😓....</p>
					</div>
				</div>
			</VContainer>
		</div>
	</div>
</template>

<style scoped>
/* styles for all jobs container */
#allJobsContainer {
	height: 75vh;
	overflow-x: hidden;
	overflow-y: scroll;
}
/* styles for all jobs container scrollbar */
#allJobsContainer::-webkit-scrollbar {
	width: 8px;
	/* Width of the scrollbar */
}
/* styles for all jobs container scrollbar */
#allJobsContainer::-webkit-scrollbar-track {
	background: #fefded;
	/* Color of the track */
}
/* styles for all jobs container scrollbar thumb */
#allJobsContainer::-webkit-scrollbar-thumb {
	background: rgb(250, 112, 112, 0.75);
	/* Color of the scrollbar handle */
}
/* styles for all jobs container scrollbar thumb */
#allJobsContainer::-webkit-scrollbar-thumb:hover {
	background: rgb(250, 112, 112, 0.75);
	/* Color of the scrollbar handle on hover */
}
/* styles for all jobs page */
#trendingJobs {
	min-height: calc(100vh - 64px);
	margin-bottom: 2rem;
}
/* styles for mark tag */
mark {
	display: inline-block;
	line-height: 0em;
	padding-bottom: 0.5em;
	background-color: rgb(250, 112, 112, 0.75);
}
</style>
