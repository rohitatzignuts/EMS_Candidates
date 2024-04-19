<script setup lang="ts">

</script>

<template>
    <div>
        <!-- default layout for the website -->
        <VLayout>
            <VAppBar color="#FA7070">
                <VContainer>
                    <div class="d-flex justify-space-between align-center">
                        <h1>Job HUNT</h1>
                        <div>
                            <VBtn prepend-icon="mdi-login" variant="tonal">sign in</VBtn>
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
    </div>
</template>

<style scoped>
.main {
    background-color: #FEFDED;
}
</style>