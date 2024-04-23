<script setup lang="ts">
import { useRoute } from 'vue-router';
import axios from "axios"

type jobType = {
    title: string,
    description: string,
    location: string,
    pay: string,
    company_name: string,
}

const router = useRoute()
const jobId = ref<number | string>(router.params.id)
const jobDetails = ref<jobType>({})
const loginToken = process.client ? localStorage.getItem('loginToken') : null
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
const fetchJobById = async () => {
    try {
        const response = await axios.get(`/job/${jobId.value}`, {
            headers: {
                Authorization: `Bearer ${loginToken}`,
            },
        });
        jobDetails.value = response.data.data
    } catch (error: any) {
        if (error.response) {
            useNuxtApp().$toast.info(`${error.response.data.message}`);
        } else {
            useNuxtApp().$toast.info(`Error : ${error}`);
        }
    }
};

watchEffect(() => {
    jobId.value
})

onMounted(() => {
    fetchJobById()
})
</script>

<template>
    <div class="jobOverview">
        <div>
            <VContainer>
                <v-breadcrumbs :items="items" divider="/"
                    class="px-0 text-h6 font-italic text-decoration-underline"></v-breadcrumbs>
            </VContainer>
        </div>
        <div>
            <JobOverview :job="jobDetails" />
        </div>
    </div>
</template>

<style scoped>
.jobOverview {
    height: calc(100vh - 64px);
}
</style>