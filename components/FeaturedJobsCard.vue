<script setup lang="ts">
import { avatarText } from "../utils.ts";

const props = defineProps<{
    job: Object;
}>();
</script>

<template>
    <div>
        <div>
            <VCard class="pa-4" min-width="300px" variant="elevated">
                <VCardText>
                    <div>
                        <VAvatar :color="props.job.company_logo ? '' : 'primary'"
                            :variant="!props.job.company_logo ? 'tonal' : undefined" size="x-large" class="mb-2">
                            <VImg v-if="props.job.company_logo"
                                :src="`http://127.0.0.1:8000/storage/${props.job.company_logo}`" />
                            <span v-else>{{ avatarText(props.job.company_name) }}</span>
                        </VAvatar>
                        <p class="text-h6 font-weight-medium">{{ props.job.title }}</p>
                        <p class="mt-2">
                            <VChip prepend-icon="mdi-domain" class="me-4">{{
                            props.job.company_name
                        }}</VChip>
                            <VChip color="primary" prepend-icon="mdi-pin">{{
                                props.job.location
                            }}</VChip>
                        </p>
                    </div>
                </VCardText>
                <div class="d-flex justify-space-between align-center mt-4">
                    <div class="text-h6 font-weight-bold">
                        ${{ props.job.pay }}/<span class="text-subtitle-2">Year</span>
                    </div>
                    <VBtn variant="tonal" color="#FA7070">Quick Apply</VBtn>
                </div>
            </VCard>
        </div>
    </div>
</template>

<style scoped></style>
