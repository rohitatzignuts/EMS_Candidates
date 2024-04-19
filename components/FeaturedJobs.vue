<script setup lang="ts">
import { useJobStore } from "../store/useJobStore";
import { storeToRefs } from "pinia";

const jobStore = useJobStore();
const { allJobs } = storeToRefs(jobStore);
const { getAllJobs } = jobStore;

onMounted(() => {
    getAllJobs();
});
</script>

<template>
    <div class="featured text-center pa-8">
        <div class="mt-16">
        <h1>Featured Jobs</h1>
        <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum <br />
            deleniti atque corrupti quos dolores
        </p>
        </div>
        <VContainer>
        <VDivider class="my-4" />
        <VRow>
            <VCol v-for="job in allJobs" :key="n">
            <FeaturedJobsCard :job="job"/>
            </VCol>
        </VRow>
        </VContainer>
    </div>
</template>

<style scoped>
.featured {
    min-height: calc(100vh - 64px);
}
</style>
