<script setup lang="ts">
import axios from "axios";

let loginToken = process.client
    ? localStorage.getItem("loginToken")
    : null
const  isAuthenticated  = ref<boolean>(loginToken !== null)
const items = [
    { title: "Applications", to: '/applications' },
    { title: "Saved Jobs", to: '/savedJobs' },
    { title: "All Jobs", to: '/allJobs' },
];

const handleLogout = async () => {
    try {
        const response = await axios.post(
            "/logout",
            null, // No data to send in the request body
            {
                headers: {
                    Authorization: `Bearer ${loginToken}`,
                },
            }
        );
        if (response) {
            useNuxtApp().$toast.info("Logged out successfully!!");
            if (process.client) {
                localStorage.removeItem("loginToken");
                localStorage.removeItem("savedJobs");
                localStorage.removeItem("userEmail");
            }
        }
    } catch (error: any) {
        if (error.response) {
            useNuxtApp().$toast.error(`${error.response.data.message}`);
        }
    }
};
watchEffect(()=>{
    isAuthenticated
})
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
                        <div class="d-flex justify-space-between align-center ga-4">

                            <NuxtLink to="/">
                                <VBtn variant="tonal">
                                    Home
                                </VBtn>
                            </NuxtLink>
                            <NuxtLink v-if="!isAuthenticated" to="/login">
                                <VBtn prepend-icon="mdi-login" variant="tonal">
                                    sign in</VBtn>
                            </NuxtLink>
                            <VBtn v-else prepend-icon="mdi-login" variant="tonal" @click="handleLogout">
                                Log Out</VBtn>

                            <VMenu v-if="isAuthenticated">
                                <template v-slot:activator="{ props }">
                                    <VBtn v-bind="props" variant="text" rounded="0">
                                        <VIcon size="large" class="pa-0 text-h4">mdi-menu</VIcon>
                                    </VBtn>
                                </template>
                                <VList id="menu">
                                    <VListItem v-for="(item, index) in items" :key="index" :value="index"
                                        background-color="#FA7070">
                                        <NuxtLink :to="item.to">
                                            <VListItemTitle id="menuItems">{{ item.title }}
                                            </VListItemTitle>
                                        </NuxtLink>
                                    </VListItem>
                                </VList>
                            </VMenu>

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
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
    color: unset;
}

#menuItems {
    color: #FA7070;
}

#menu {
    background-color: #FEFDED;
}
</style>
