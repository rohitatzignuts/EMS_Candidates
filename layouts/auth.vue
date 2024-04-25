<script setup lang="ts">

</script>
<template>
    <div>
        <main>
            <VContainer>
                <slot />    
            </VContainer>
        </main>
    </div>
</template>
<style scoped>
main {
    min-height: 100vh;
    display: grid;
    place-items: center;
}
</style>