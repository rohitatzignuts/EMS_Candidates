<script setup lang="ts">
import { requiredValidator } from '../utils/validators'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { VForm } from 'vuetify/components'

type Application = {
	job_id: string | number
	user_email: string | null
	resume: string | null
}

const props = defineProps<{
	isDialogOpen: boolean
}>()

const emits = defineEmits<{
	(e: 'handleDialogClose', payload: boolean): void
}>()

const selectedResume = ref<any>()
const isFormValid = ref<boolean>(false)
const refForm = ref<VForm>()
const router = useRoute()
const currentjob_id = ref<number | string>(router.params.id)
const storeduser_email = process.client ? localStorage.getItem('userEmail') : ''
const jobApplicationData = ref<Application>({
	job_id: currentjob_id.value,
	user_email: storeduser_email,
	resume: null
})
const loginToken = process.client ? localStorage.getItem('loginToken') : null

const selectResume = (e: any) => {
	selectedResume.value = e.target.files[0]
}

const handleApplicationSubmit = async () => {
	try {
		const res = await refForm.value?.validate()
		if (res?.valid) {
			const data = new FormData()
			data.append('resume', selectedResume.value)
			data.append('job_id', jobApplicationData.value.job_id)
			data.append('user_email', jobApplicationData.value.user_email)
			const response = await axios.post(
				`/job-${currentjob_id.value}/apply`,
				data,
				{
					headers: {
						Authorization: `Bearer ${loginToken}`
					}
				}
			)
			useNuxtApp().$toast.success(`${response.data.message}`)
			emits('handleDialogClose', false)
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
		<!-- apply job dialog to submit resume  -->
		<v-dialog :model-value="props.isDialogOpen" max-width="500" persistent>
			<VCard color="#FA7070">
				<h1 class="text-h4 pa-4">Ready To Apply?</h1>
				<VCardText>
					<div>
						<VForm
							v-model="isFormValid"
							ref="refForm"
							enctype="multipart/form-data"
							@submit.prevent="handleApplicationSubmit"
						>
							<!-- applicant's email  -->
							<VTextField
								v-model="jobApplicationData.user_email"
								disabled
								variant="underlined"
								label="Email"
							/>
							<!-- applicant's resume  -->
							<VFileInput
								:rules="[requiredValidator]"
								accept="pdf|image"
								variant="underlined"
								label="Resume"
								density="default"
								@change="selectResume"
							/>
							<!-- submit button  -->
							<div class="mb-4">
								<VBtn
									block
									class="mt-2"
									type="submit"
									variant="flat"
									size="large"
									>Submit</VBtn
								>
							</div>
						</VForm>
					</div>
				</VCardText>
				<VDivider />
				<!-- close dialog button  -->
				<VBtn
					prepend-icon="mdi-close"
					color="#FEFDED"
					variant="text"
					size="large"
					@click="emits('handleDialogClose', false)"
					>Close</VBtn
				>
			</VCard>
		</v-dialog>
	</div>
</template>

<style scoped></style>
