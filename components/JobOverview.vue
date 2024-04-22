<script setup lang="ts">
const props = defineProps<{
    job: {
        title: string,
        description: string,
        location: string,
        pay: string,
        company_name: string,
    }
}>()
</script>

<template>
    <div>
        <div>
            <VContainer class="text-left py-10">
                <div>
                    <VChip color="#FA7070" variant="flat">Full Time</VChip>
                    <p class="text-h3 font-weight-bold py-2">{{ props.job.title }}</p>
                    <span class="text-body-1">
                        <VIcon icon="mdi-map-marker" color="#FA7070" />{{ props.job.location }}
                    </span>
                    <p class="text-body-1 mt-6">{{ props.job.description }}</p>
                </div>
                <div class="mt-12">
                    <VBtn class="me-4" variant="flat" color="#FA7070" size="large">Apply Job</VBtn>
                    <VBtn variant="flat" color="#7272724d" size="large">Save Job</VBtn>
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
    </div>
</template>
