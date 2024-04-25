<script setup lang="ts">
import { avatarText } from "../utils";
import { useRoute } from 'vue-router';
import {useJobStore} from '~/store/useJobStore'

const props = defineProps<{
    job: {
        id: number,
        company_logo: string,
        company_name: string,
        job_title: string,
        title?: string,
        location?: string,
        job_location: string,
        job_pay: string,
        pay?: string,
        status: string
    }
}>();

const router = useRoute()
const jobStore = useJobStore()
const {handleJobRemove} = jobStore
const statusChipColor = (value: string) => value === 'Accepted' ? 'success' : value === 'Rejected' ? 'error' : 'warning';
</script>

<template>
    <div>
        <VCard class="pa-4" min-height="150px" width="100%" variant="elevated">
            <div class="mb-4">
                <VRow>
                    <VCol cols="8" class="d-flex justify-space-start ga-2 align-top">
                        <div>
                            <VAvatar :color="props.job.company_logo ? '' : 'primary'"
                                :variant="!props.job.company_logo ? 'tonal' : undefined" size="x-large" class="mb-2"
                                rounded="0">
                                <VImg v-if="props.job.company_logo"
                                    :src="`http://127.0.0.1:8000/storage/${props.job.company_logo}`" />
                                <span v-else>{{ avatarText(props.job.company_name) }}</span>
                            </VAvatar>
                        </div>
                        <div>
                            <caption>{{ props.job.company_name }}</caption>
                            <strong>{{ props.job.job_title ?? props.job.title }}</strong>
                        </div>
                    </VCol>
                    <VCol cols="4" class="text-right">
                        <VChip v-if="router.fullPath === '/applications'" :color="statusChipColor(props.job.status)"
                            variant="tonal" size="large">{{
                            props.job.status }}
                            <VTooltip activator="parent" location="start">
                                your application is..
                            </VTooltip>
                        </VChip>
                        <div v-else>
                            <NuxtLink :to="`job-${props.job.id}`">
                                <VBtn variant="flat" rounded color="#C6EBC5">
                                    Apply
                                </VBtn>
                            </NuxtLink>
                            <VBtn rounded class="ms-2" variant="tonal" color="#FA7070"
                                @click="handleJobRemove(props.job.id)">remove</VBtn>
                        </div>
                    </VCol>
                </VRow>
            </div>
            <div class="d-flex justify-space-start ga-3 align-center">
                <div>
                    <VChip variant="tonal" color="#FA7070">
                        <VIcon start icon="mdi-pin" />
                        {{ props.job.job_location ?? props.job.location }}
                    </VChip>
                </div>
                <div>
                    <VChip variant="tonal" color="#FA7070">
                        <VIcon start icon="mdi-clock-time-eight" />
                        fulltime
                    </VChip>
                </div>
                <div>
                    <VChip variant="tonal" color="#FA7070">
                        <VIcon start icon="mdi-currency-usd" />
                        {{ props.job.job_pay ?? props.job.pay }}
                    </VChip>
                </div>
            </div>
        </VCard>
    </div>
</template>

<style scoped></style>