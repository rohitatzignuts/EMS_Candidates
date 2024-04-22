<script setup lang="ts">
import axios from 'axios';

const isDialogOpen = ref<boolean>(false)
const loginToken = ref(process.client ? localStorage.getItem('loginToken') : null)

const handleAuth = () => {
    isDialogOpen.value = true
}
const handleLogout = async () => {
    try {
        const response = await axios.post(
            "/logout",
            null, // No data to send in the request body
            {
                headers: {
                    Authorization: `Bearer ${loginToken.value}`,
                },
            })
        if (response) {
            useNuxtApp().$toast.info('Logged out successfully!!');
            if (process.client) {
                localStorage.removeItem('loginToken')
                loginToken.value = null
            }
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div>
        <!-- default layout for the website -->
        <VLayout>
            <VAppBar color="#FA7070">
                <VContainer>
                    <div class="d-flex justify-space-between align-center">
                        <NuxtLink to="/">
                            <h1>Job HUNT</h1>
                        </NuxtLink>
                        <div>
                            <VBtn v-if="!loginToken" prepend-icon="mdi-login" variant="tonal" @click="handleAuth">sign
                                in</VBtn>
                            <VBtn v-if="loginToken" prepend-icon="mdi-login" variant="tonal" @click="handleLogout">Log Out</VBtn>
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
        <AuthDialogs :is-dialog-open="isDialogOpen" @handle-dialog-close="isDialogOpen = false" />
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
    color: unset;
}
</style>