<script setup></script>

<template>
    <div class="footer">
        <VContainer class="pa-8">
            <VRow>
                <VCol cols="6">
                    <h1 class="text-5 font-weight-bold ">Job HUNT</h1>
                    <span class="text-body-2">
                        Collins Street West, Victoria Near Bank Road
                        Australia QHR12456.
                    </span>
                </VCol>
                <VCol cols="6">
                    <VRow>
                        <VCol>
                            <div>
                                <p class="text-subtitle-1 font-weight-bold pb-2">For Clients</p>
                                <ul class="text-subtitle-1">
                                    <li><a href="#">Talent Marketplace</a></li>
                                    <li><a href="#">Talent Marketplace</a></li>
                                    <li><a href="#">Talent Marketplace</a></li>
                                    <li><a href="#">Talent Marketplace</a></li>
                                    <li><a href="#">Talent Marketplace</a></li>
                                </ul>
                            </div>
                        </VCol>
                        <VCol>
                            <div>
                                <p class="text-subtitle-1 font-weight-bold pb-2">Our Resources</p>
                                <ul class="text-subtitle-1">
                                    <li><a href="#">Free Business tools</a></li>
                                    <li><a href="#">Free Business tools</a></li>
                                    <li><a href="#">Free Business tools</a></li>
                                    <li><a href="#">Free Business tools</a></li>
                                    <li><a href="#">Free Business tools</a></li>
                                </ul>
                            </div>
                        </VCol>
                    </VRow>
                </VCol>
            </VRow>
            <VDivider class="my-4" />
            <div>
                <p>© 2024 Job HUNT Zignuts</p>
            </div>
        </VContainer>
    </div>
</template>

<style scoped>
.footer {
    min-height: 25vh;
    background-color: #FA7070;
    color: #FEFDED;
}

ul,
li {
    list-style-type: none;
    line-height: 2rem;
}

a {
    text-decoration: none;
    color: unset;

}
</style>