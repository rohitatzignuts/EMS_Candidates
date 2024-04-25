<script setup lang="ts">
import { useJobStore } from "../store/useJobStore";
import { storeToRefs } from "pinia";

const jobStore = useJobStore();
const { allJobs } = storeToRefs(jobStore);
const { getAllJobs,handleJobSave } = jobStore;

onMounted(() => {
    getAllJobs();
});
</script>

<template>
    <div class="featured text-center pa-8">
        <div class="mt-16">
            <h1 class="text-h3 font-weight-bold pb-4">Featured Jobs</h1>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum <br />
                deleniti atque corrupti quos dolores
            </p>
        </div>
        <VContainer class="mb-12">
            <VRow>
                <VCol v-for="job in allJobs" :key="job.id">
                        <FeaturedJobsCard :job="job" @handle-save-job="handleJobSave(job)"/>
                </VCol>
            </VRow>
        </VContainer>
    </div>
</template>

<style scoped>
.featured {
    min-height: max-content
}
a{
    color: unset;
    text-decoration: none;
}
</style>
