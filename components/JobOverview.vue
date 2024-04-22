<script setup>

</script>

<template>
    <div>
        <div class="jobOverview">
            <VContainer class="text-left py-10">
                <div>
                    <VChip color="#FA7070" variant="flat">Full Time</VChip>
                    <p class="text-h3 font-weight-bold py-2">Sr. Front-end Designer</p>
                    <span class="text-body-1">
                        <VIcon icon="mdi-map-marker" color="#FA7070" />California, USA
                    </span>
                    <p class="text-body-1 mt-6">We are looking for a experienced Senior Front-End Developer with an
                        advanced level of english to
                        design UI/UX interface for web and mobile apps.</p>
                </div>
                <div class="mt-12">
                    <VBtn class="me-4" variant="flat" color="#FA7070" size="large">Apply Job</VBtn>
                    <VBtn variant="flat" color="#7272724d" size="large">Save Job</VBtn>
                </div>
                <div class="d-flex justify-space-start ga-12 mt-12">
                    <div class="d-flex align-center ga-1">
                        <VIcon icon="mdi-domain" size="x-large" />
                        <span class="text-h5">Company</span>
                    </div>
                    <div class="d-flex align-center ga-1">
                        <VIcon icon="mdi-map-marker" size="x-large" />
                        <span class="text-h5">Location</span>
                    </div>
                    <div class="d-flex align-center ga-1">
                        <VIcon icon="mdi-currency-usd" size="x-large" />
                        <span class="text-h5">Sallary</span>
                    </div>
                </div>
            </VContainer>
        </div>
    </div>
</template>

<style scoped>
.jobOverview {
    width: 100%;
    height: calc(100vh - 64px);
    --color: #7272724d;
    background-color: #FEFDED;
    background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent);
    background-size: 55px 55px;
    background-repeat: repeat;
}
</style>