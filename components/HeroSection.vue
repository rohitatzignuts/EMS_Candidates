<script setup lang="ts">

</script>

<template>
    <div>
        <section class="hero">
            <div>
                <div>
                    <VBtn color="#C6EBC5" rounded size="small" variant="flat">Get Your Hot Jobs</VBtn>
                </div>
                <h1 class="text-h2 text-xm-h6 font-weight-bold" color="#FA7070">Find the great jobs<br />
                    offer for you</h1>
                <p class="text-h6">Getting a new job is never easy. Check what new jobs we have in store for you on Job
                    Stock.</p>
            </div>
        </section>
    </div>
</template>


<style scoped>
.hero {
    background-image: url(../public/simple-banner.webp);
    background-size: cover;
    height: calc(100vh - 64px);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    text-align: center;
    font-size: 2rem;
}

h1 {
    line-height: 1.25;
    color: #FA7070;
}
</style>