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
                <div class="text-h4 font-weight-medium appliedJobsText mb-6"><mark class="appliedJobsSpan">Jobs You Have
                        Applied For...</mark>
                </div>
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
    background: #FEFDED;
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