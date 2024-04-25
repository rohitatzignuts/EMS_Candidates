<script setup lang="ts">


definePageMeta({
    layout: 'auth'
})
</script>

<template>
    <div>
        <div id="loginForm">
            <div class="text-h4 font-weight-medium appliedJobsText mb-6"><mark class="appliedJobsSpan">Login To Continue..</mark>
            </div>
            <AuthDialogs />
        </div>
    </div>
</template>

<style scoped>
mark {
    display: inline-block;
    line-height: 0em;
    padding-bottom: 0.5em;
    background-color: rgb(250, 112, 112, 0.75);
}
</style>