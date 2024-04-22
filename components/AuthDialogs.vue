<script setup lang="ts">
import type { VForm } from "vuetify/components";
import { emailValidator, requiredValidator } from "../utils/validators";
import axios from "axios";

const refLoginForm = ref<VForm>();
const isLoginFormValid = ref<boolean>(false);
const refSignupForm = ref<VForm>();
const isSignupFormValid = ref<boolean>(false);
const tab = ref<any>(null);
const props = defineProps<{
    isDialogOpen: boolean;
}>();

const emits = defineEmits<{
    (event: "handleDialogClose", payload: boolean): void;
}>();

const userRegisterData = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
})

const handleUserRegister = async () => {
    try {
        const resoponse = await axios.post('/register' , userRegisterData)
        console.log(resoponse.data);
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div>
        <VDialog :model-value="props.isDialogOpen" persistent max-width="500">
            <VCard color="#FA7070">
                <h1 class="text-h3 pa-4">Hello, Again !!</h1>
                <VTabs v-model="tab">
                    <VTab value="LogIn" class="font-weight-bold">Log In</VTab>
                    <VTab value="SignUp" class="font-weight-bold">Sign Up</VTab>
                </VTabs>
                <VCardText>
                    <VWindow v-model="tab">
                        <VWindowItem value="LogIn" class="mb-6">
                            <VForm v-model="isLoginFormValid" ref="refLoginForm">
                                <div>
                                    <VTextField :rules="[emailValidator, requiredValidator]" variant="underlined"
                                        label="Email" />
                                    <VTextField :rules="[requiredValidator]" variant="underlined" label="password"
                                        type="password" />
                                    <VBtn block type="submit" size="large">Log in</VBtn>
                                </div>
                                <VDivider class="my-4" />
                                <div>
                                    <span>Dont have an account ?
                                        <VBtn variant="text" class="font-italic text-decoration-underline"
                                            @click="tab = 'SignUp'">Sign Up</VBtn>
                                    </span>
                                </div>
                            </VForm>
                        </VWindowItem>
                        <!-- sign up tab  -->
                        <VWindowItem value="SignUp">
                            <VForm v-model="isSignupFormValid" ref="refSignupForm" @submit.prevent="handleUserRegister">
                                <div>
                                    <VTextField :rules="[requiredValidator]" variant="underlined" label="First Name" />
                                    <VTextField :rules="[requiredValidator]" variant="underlined" label="Last Name" />
                                    <VTextField :rules="[emailValidator, requiredValidator]" variant="underlined"
                                        label="Email" />
                                    <VTextField :rules="[requiredValidator]" variant="underlined" label="password"
                                        type="password" />
                                    <VBtn block type="sumbit" size="large">Sign Up</VBtn>
                                </div>
                                <VDivider class="my-4" />
                                <div>
                                    <span>Already have an account ?
                                        <VBtn variant="text" class="font-italic text-decoration-underline"
                                            @click="tab = 'LogIn'">Log in</VBtn>
                                    </span>
                                </div>
                            </VForm>
                        </VWindowItem>
                    </VWindow>
                </VCardText>
                <VBtn prepend-icon="mdi-close" color="#FEFDED" variant="text" size="large"
                    @click="emits('handleDialogClose', false)">Close</VBtn>
            </VCard>
        </VDialog>
    </div>
</template>

<style scoped></style>
