<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useJobStore } from "../store/useJobStore";
import { storeToRefs } from "pinia";
import { onMounted } from 'vue';

const jobStore = useJobStore();
const { userAppliedJobs } = storeToRefs(jobStore);
const { getUserAppliedJobs } = jobStore;
const router = useRoute()
const items = [
    {
        title: 'Home',
        disabled: false,
        to: '/',
    },
    {
        title: (router.fullPath).toString().substring(1),
        disabled: true,
        to: router.fullPath,
    },
]
onMounted(() => {
    getUserAppliedJobs()
})
</script>

<template>
    <div class="savedJobs">
        <VContainer>
            <div>
                <v-breadcrumbs :items="items" divider="/"
                    class="px-0 text-h6 font-italic text-decoration-underline"></v-breadcrumbs>
            </div>

            <div class="pt-4">
                <p class="text-h4 font-weight-medium">Jobs You Have Applied For...</p>
                <div class="appliedJobsContainer">
                    <VRow class="mt-6">
                        <VCol v-for="job in userAppliedJobs" :id="job.id" cols="6">
                            <ApplicationCard :job="job" />
                        </VCol>
                    </VRow>
                </div>
            </div>
        </VContainer>
    </div>
</template>

<style scoped>
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
    background: rgb(250, 112, 112,0.75);
    /* Color of the track */
}

.appliedJobsContainer::-webkit-scrollbar-thumb {
    background: #FEFDED;
    /* Color of the scrollbar handle */
}

.appliedJobsContainer::-webkit-scrollbar-thumb:hover {
    background: #FEFDED;
    /* Color of the scrollbar handle on hover */
}
</style>