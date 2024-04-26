<script setup lang="ts">
import { useJobStore } from '~/store/useJobStore';

const props = defineProps<{
    job: {
        id?: string | number,
        title: string,
        description: string,
        location: string,
        pay: string,
        company_logo : string,
        company_name: string,
        is_trending? : number
    }
}>()
const isApplyDialogOpen = ref<boolean>(false)
const loginToken = ref(process.client ? localStorage.getItem('loginToken') : null)
const jobStore = useJobStore()
const { handleJobSave } = jobStore
watchEffect(() => {
    loginToken.value
})
</script>

<template>
    <div>
        <div>
            <VContainer class="text-left py-5">
                <div>
                    <div>
                        <VChip color="#FA7070" variant="flat" class="me-2">Full Time</VChip>
                        <VChip v-if="props.job.is_trending === 1" color="#C6EBC5" variant="flat">Trending🔥</VChip>
                    </div>
                    <p class="text-h3 font-weight-bold py-2">{{ props.job.title }}</p>
                    <span class="text-body-1">
                        <VIcon icon="mdi-map-marker" color="#FA7070" />{{ props.job.location }}
                    </span>
                    <p class="text-body-1 mt-6">{{ props.job.description }}</p>
                </div>
                <div class="mt-12">
                    <VBtn class="me-4" variant="flat" color="#FA7070" size="large" @click="isApplyDialogOpen = true"
                        :disabled="!loginToken">Apply Job</VBtn>
                    <VBtn variant="flat" color="#7272724d" size="large" :disabled="!loginToken"
                        @click="handleJobSave(props.job)">
                        Save Job</VBtn>
                    <br>
                    <div v-if="!loginToken" class="mt-7 signInText">
                        <mark>**sign in to apply**</mark>
                    </div>
                </div>
                <div class="d-flex justify-space-start ga-12 mt-12">
                    <div class="d-flex align-center ga-1">
                        <VIcon icon="mdi-domain" size="x-large" />
                        <span class="text-h5">{{ props.job.company_name }}</span>
                    </div>
                    <div class="d-flex align-center ga-1">
                        <VIcon icon="mdi-map-marker" size="x-large" />
                        <span class="text-h5">{{ props.job.location }}</span>
                    </div>
                    <div class="d-flex align-center ga-1">
                        <VIcon icon="mdi-currency-usd" size="x-large" />
                        <span class="text-h5">{{ props.job.pay }}</span>
                    </div>
                </div>
            </VContainer>
        </div>
        <ApplyJobDialog :isDialogOpen="isApplyDialogOpen" @handleDialogClose="isApplyDialogOpen = false" />
    </div>
</template>

<style scoped>
mark {
    display: inline-block;
    line-height: 0em;
    padding-bottom: 0.5em;
    background-color: rgb(250, 112, 112, 0.75);
    opacity: 0.75;
}
</style>