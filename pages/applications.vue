<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useJobStore } from '../store/useJobStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const jobStore = useJobStore()
const { userAppliedJobs } = storeToRefs(jobStore)
const { getUserAppliedJobs } = jobStore
const router = useRouter()

// fetch the jobs user has applied for when the component mounts 
onMounted(() => {
	getUserAppliedJobs()
})
</script>

<template>
	<div class="applications">
        <!-- listing of user's job applications  -->
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
					<mark class="appliedJobsSpan">Jobs You Have Applied For...</mark>
				</div>
                <!-- applications list  -->
				<div v-if="userAppliedJobs.length > 0" class="appliedJobsContainer">
					<VRow>
						<VCol v-for="job in userAppliedJobs" :id="job.id" cols="12">
							<ApplicationCard :job="job" />
						</VCol>
					</VRow>
				</div>
				<div v-else>
					<p class="text-h6">you haven't applied for any jobs yet....</p>
				</div>
			</div>
		</VContainer>
	</div>
</template>

<style scoped>
/* styles for mark tag  */
mark {
	display: inline-block;
	line-height: 0em;
	padding-bottom: 0.5em;
	background-color: rgb(250, 112, 112, 0.75);
}
/* styles for applicatios page  */
.applications {
	min-height: calc(100vh - 64px);
}
/* styles for appliedJobsContainer */
.appliedJobsContainer {
	height: 75vh;
	overflow-x: hidden;
	overflow-y: scroll;
}
/* styles for appliedJobsContainer scroll bar*/
.appliedJobsContainer::-webkit-scrollbar {
	width: 8px;
	/* Width of the scrollbar */
}
/* styles for appliedJobsContainer scroll bar*/
.appliedJobsContainer::-webkit-scrollbar-track {
	background: #fefded;
	/* Color of the track */
}
/* styles for appliedJobsContainer scroll thumb*/
.appliedJobsContainer::-webkit-scrollbar-thumb {
	background: rgb(250, 112, 112, 0.75);
	/* Color of the scrollbar handle */
}
/* styles for appliedJobsContainer scroll thumb*/
.appliedJobsContainer::-webkit-scrollbar-thumb:hover {
	background: rgb(250, 112, 112, 0.75);
	/* Color of the scrollbar handle on hover */
}
</style>
