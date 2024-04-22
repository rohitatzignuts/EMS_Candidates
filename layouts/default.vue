<script setup lang="ts">
const isDialogOpen = ref<boolean>(false)

const handleAuth = () => {
    isDialogOpen.value = true
}
</script>

<template>
    <div>
        <!-- default layout for the website -->
        <VLayout>
            <VAppBar color="#FA7070">
                <VContainer>
                    <div class="d-flex justify-space-between align-center">
                        <NuxtLink to="/" ><h1>Job HUNT</h1></NuxtLink>
                        <div>
                            <VBtn prepend-icon="mdi-login" variant="tonal" @click="handleAuth">sign in</VBtn>
                        </div>
                    </div>
                </VContainer>
            </VAppBar>
            <VMain>
                <div class="main">
                    <slot />
                </div>
            </VMain>
        </VLayout>
        <Footer />
        <AuthDialogs :is-dialog-open="isDialogOpen" @handle-dialog-close="isDialogOpen = false"/>
    </div>
</template>

<style scoped>
a{
    text-decoration: none;
    color: unset;
}
</style>