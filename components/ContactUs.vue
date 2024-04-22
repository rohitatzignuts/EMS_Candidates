<script setup>

</script>

<template>
    <div class="contactUs">
        <div class="pa-12 text-center">
            <VContainer>

                <div>
                    <h1 class="pb-4 text-h3 font-weight-bold">Are You Already Working With Us?</h1>
                    <p class="text-body-1">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                        praesentium voluptatum
                        deleniti<br /> atque corrupti quos dolores et quas molestias</p>
                </div>
                <div class="w-75 mx-auto my-12">
                    <VTextField clearable variant="solo" append-inner-icon="mdi-send" label="Email Address" />
                </div>
            </VContainer>
        </div>
    </div>
</template>

<style scoped>
.contactUs {
    min-height: max-content;
    --color: rgba(114, 114, 114, 0.3);
    background-color: #FEFDED;
    background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent);
    background-size: 55px 55px;
    background-repeat: repeat;
}
</style>