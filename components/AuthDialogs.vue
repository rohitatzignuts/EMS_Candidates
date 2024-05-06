<script setup lang="ts">
import type { VForm } from 'vuetify/components'
import { useAuthStore } from '~/store/useAuthStore'
import { useRouter } from 'vue-router'
import {
	emailValidator,
	requiredValidator,
	confirmedValidator
} from '../utils/validators'
import axios from 'axios'
import { storeToRefs } from 'pinia'

const emits = defineEmits<{
	(event: 'handleDialogClose', payload: boolean): void
}>()

const refLoginForm = ref<VForm>()
const isLoginFormValid = ref<boolean>(false)
const refSignupForm = ref<VForm>()
const isSignupFormValid = ref<boolean>(false)
const tab = ref<any>(null)
const userRegisterData = ref({
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	password_confirmation: ''
})
const userLoginData = ref({
	email: '',
	password: ''
})

const router = useRouter()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

// manage user Login
const handleUserLogin = async () => {
	try {
		// validate form data
		const res = await refLoginForm.value?.validate()
		if (res?.valid) {
			const response = await axios.post('/login', userLoginData.value)
			// store user email and login token
			localStorage.setItem('loginToken', response.data.data.access_token)
			localStorage.setItem('userEmail', userLoginData.value.email)
			// show login confirmation
			setTimeout(() => {
				useNuxtApp().$toast.success('Logged in successfully!!')
			}, 500)
			router.push({ path: '/' })
			isAuthenticated.value = true
			// reset form feilds
			refLoginForm.value?.reset()
			refLoginForm.value?.resetValidation()
		}
	} catch (error: any) {
		if (error.response) {
			useNuxtApp().$toast.error(`${error.response.data.message}`)
		} else {
			useNuxtApp().$toast.error(`Error : ${error}`)
		}
	}
}

// manage user registration
const handleUserRegister = async () => {
	try {
		// validate form data
		const res = await refSignupForm.value?.validate()
		if (res?.valid) {
			const response = await axios.post('/register', userRegisterData.value)
			if (response) {
				refSignupForm.value?.reset()
				refSignupForm.value?.resetValidation()
				useNuxtApp().$toast.success('Regestered successfully!!')
				// shift user to login tab
				tab.value = 'LogIn'
			}
		}
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
		<VCard color="#FA7070">
			<h1 class="text-h4 pa-4">Hello, Again !!</h1>
			<VTabs v-model="tab">
				<VTab value="LogIn" class="font-weight-bold">Log In</VTab>
				<VTab value="SignUp" class="font-weight-bold">Sign Up</VTab>
			</VTabs>
			<VCardText>
				<VWindow v-model="tab">
					<VWindowItem value="LogIn" class="mb-6">
						<!-- user login form  -->
						<VForm
							v-model="isLoginFormValid"
							ref="refLoginForm"
							@submit.prevent="handleUserLogin"
						>
							<div>
								<!-- user email  -->
								<VTextField
									v-model="userLoginData.email"
									:rules="[emailValidator, requiredValidator]"
									variant="underlined"
									label="Email"
								/>
								<!-- user password  -->
								<VTextField
									v-model="userLoginData.password"
									:rules="[requiredValidator]"
									variant="underlined"
									label="password"
									type="password"
								/>
								<!-- login button  -->
								<VBtn block type="submit" size="large">Log in</VBtn>
							</div>
							<VDivider class="my-4" />
							<div>
								<span
									>Dont have an account ?
									<VBtn
										variant="text"
										class="font-italic text-decoration-underline"
										@click="tab = 'SignUp'"
										>Sign Up</VBtn
									>
								</span>
							</div>
						</VForm>
					</VWindowItem>
					<!-- sign up tab  -->
					<VWindowItem value="SignUp">
						<!-- user register form  -->
						<VForm
							v-model="isSignupFormValid"
							ref="refSignupForm"
							@submit.prevent="handleUserRegister"
						>
							<div>
								<!-- user first name  -->
								<VTextField
									v-model="userRegisterData.first_name"
									:rules="[requiredValidator]"
									variant="underlined"
									label="First Name"
								/>
								<!-- user last name  -->
								<VTextField
									v-model="userRegisterData.last_name"
									:rules="[requiredValidator]"
									variant="underlined"
									label="Last Name"
								/>
								<!-- user email  -->
								<VTextField
									v-model="userRegisterData.email"
									:rules="[emailValidator, requiredValidator]"
									variant="underlined"
									label="Email"
								/>
								<!-- user password  -->
								<VTextField
									v-model="userRegisterData.password"
									:rules="[requiredValidator]"
									variant="underlined"
									label="Password"
									type="password"
								/>
								<!-- user confirm password  -->
								<VTextField
									v-model="userRegisterData.password_confirmation"
									:rules="[
										requiredValidator,
										confirmedValidator(
											userRegisterData.password,
											userRegisterData.password_confirmation
										)
									]"
									variant="underlined"
									label="Confirm Password"
									type="password"
								/>
								<!-- sign up button  -->
								<VBtn block type="submit" size="large">Sign Up</VBtn>
							</div>
							<VDivider class="my-4" />
							<div>
								<span
									>Already have an account ?
									<VBtn
										variant="text"
										class="font-italic text-decoration-underline"
										@click="tab = 'LogIn'"
										>Log in</VBtn
									>
								</span>
							</div>
						</VForm>
					</VWindowItem>
				</VWindow>
				<VCardActions
					><NuxtLink to="/">Continue without Login....</NuxtLink></VCardActions
				>
			</VCardText>
		</VCard>
	</div>
</template>

<style scoped>
/* styles for a tag  */
a {
	color: unset;
}
</style>
