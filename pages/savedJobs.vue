<script setup lang="ts">
import { useRoute } from 'vue-router';

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
</script>

<template>
    <div class="savedJobs">
        <VContainer>
            <div>
                <v-breadcrumbs :items="items" divider="/"
                    class="px-0 text-h6 font-italic text-decoration-underline"></v-breadcrumbs>
            </div>
        </VContainer>
    </div>
</template>

<style scoped>
.savedJobs {
    min-height: calc(100vh - 64px);
}
</style>