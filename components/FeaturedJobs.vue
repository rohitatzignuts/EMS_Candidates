<script setup lang="ts">
import { useJobStore } from '~/store/useJobStore'
import { storeToRefs } from 'pinia'

const jobStore = useJobStore()
const { trendingJobs } = storeToRefs(jobStore)
const { getTrendingJobs, handleJobSave } = jobStore

onMounted(() => {
	getTrendingJobs()
})
</script>

<template>
	<div class="featured text-center px-8">
		<div class="mt-16">
			<h1 class="text-h3 font-weight-bold pb-4">Trending Jobs</h1>
			<p>
				At vero eos et accusamus et iusto odio dignissimos ducimus qui
				blanditiis praesentium voluptatum <br />
				deleniti atque corrupti quos dolores
			</p>
		</div>
		<!-- show currently trending jobs  -->
		<VContainer class="mb-6">
			<div v-if="trendingJobs.length > 0">
				<VRow>
					<VCol v-for="job in trendingJobs" :key="job.id">
						<FeaturedJobsCard
							:job="job"
							@handle-save-job="handleJobSave(job)"
						/>
					</VCol>
				</VRow>
			</div>
			<div v-else>
				<p id="nothing"class="text-h6 font-weight-bold">Nothing to see here....🗑️</p>
			</div>
			<div class="py-4 mt-4">
				<NuxtLink to="/allJobs">
					<VBtn
						variant="text"
						class="font-italic"
						append-icon="mdi-arrow-right-thin"
						><mark>View All</mark>
					</VBtn>
				</NuxtLink>
			</div>
		</VContainer>
	</div>
</template>

<style scoped>
.featured {
	min-height: max-content;
}

mark {
	display: inline-block;
	line-height: 0em;
	padding-bottom: 0.5em;
	background-color: rgb(250, 112, 112, 0.75);
}
#nothing{
	border: 0.2rem dotted #FA7070;
	padding: 0.75rem;
}
a {
	color: unset;
	text-decoration: none;
}
</style>
