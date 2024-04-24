<script setup lang="ts">
import type { VForm } from "vuetify/components";
import { emailValidator, requiredValidator, confirmedValidator } from "../utils/validators";
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
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const userLoginData = ref({
    email: '',
    password: '',
})

const handleUserLogin = async () => {
    try {
        refLoginForm.value?.validate().then(async (res) => {
            if (res.valid) {
                const response = await axios.post('/login', userLoginData.value)
                localStorage.setItem('loginToken', response.data.access_token)
                localStorage.setItem('userEmail', userLoginData.value.email)
                useNuxtApp().$toast.success('Logged in successfully!!');
                refLoginForm.value?.reset()
                refLoginForm.value?.resetValidation()
                emits('handleDialogClose', false)
            }
        })
    } catch (error: any) {
        alert(error)
        if (error.response) {
            useNuxtApp().$toast.error(`${error.response.data.message}`)
        } else {
            useNuxtApp().$toast.error(`Error : ${error}`)
        }
    }
}


const handleUserRegister = async () => {
    try {
        refSignupForm.value?.validate().then(async (res) => {
            if (res.valid) {
                const response = await axios.post('/register', userRegisterData.value)
                if (response) {
                    refSignupForm.value?.reset()
                    refSignupForm.value?.resetValidation()
                    tab.value = "LogIn"
                }
            }
        })
    } catch (error: any) {
        if (error.response) {
            useNuxtApp().$toast.error(`${error.response.data.message}`)
        } else {
            useNuxtApp().$toast.error(`Error : ${error}`)
        }
    }
}
</script>

<template>
    <div>
        <VDialog :model-value="props.isDialogOpen" persistent max-width="500">
            <VCard color="#FA7070">
                <h1 class="text-h4 pa-4">Hello, Again !!</h1>
                <VTabs v-model="tab">
                    <VTab value="LogIn" class="font-weight-bold">Log In</VTab>
                    <VTab value="SignUp" class="font-weight-bold">Sign Up</VTab>
                </VTabs>
                <VCardText>
                    <VWindow v-model="tab">
                        <VWindowItem value="LogIn" class="mb-6">
                            <VForm v-model="isLoginFormValid" ref="refLoginForm" @submit.prevent="handleUserLogin">
                                <div>
                                    <VTextField v-model="userLoginData.email"
                                        :rules="[emailValidator, requiredValidator]" variant="underlined"
                                        label="Email" />
                                    <VTextField v-model="userLoginData.password" :rules="[requiredValidator]"
                                        variant="underlined" label="password" type="password" />
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
                                    <VTextField v-model="userRegisterData.first_name" :rules="[requiredValidator]"
                                        variant="underlined" label="First Name" />
                                    <VTextField v-model="userRegisterData.last_name" :rules="[requiredValidator]"
                                        variant="underlined" label="Last Name" />
                                    <VTextField v-model="userRegisterData.email"
                                        :rules="[emailValidator, requiredValidator]" variant="underlined"
                                        label="Email" />
                                    <VTextField v-model="userRegisterData.password" :rules="[requiredValidator]"
                                        variant="underlined" label="Password" type="password" />
                                    <VTextField v-model="userRegisterData.password_confirmation"
                                        :rules="[requiredValidator, confirmedValidator(userRegisterData.password, userRegisterData.password_confirmation)]"
                                        variant="underlined" label="Confirm Password" type="password" />
                                    <VBtn block type="submit" size="large">Sign Up</VBtn>
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
