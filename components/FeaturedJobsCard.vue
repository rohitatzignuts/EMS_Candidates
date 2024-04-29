<script setup lang="ts">
import { avatarText } from '../utils'

const props = defineProps<{
	job: {
		id: number
		company_logo: string
		company_name: string
		title: string
		location: string
		pay: string
	}
}>()

const emits = defineEmits<{
	(e: 'handleSaveJob', payload: object): void
}>()

let loginToken = ref(process.client ? localStorage.getItem('loginToken') : null)

watchEffect(() => {
	loginToken.value
})
</script>

<template>
	<div>
		<div>
			<!-- featured job card  -->
			<VCard class="pa-4" min-width="300px" variant="elevated">
				<VCardText>
					<div>
						<!-- company logo  -->
						<NuxtLink :to="`job-${props.job.id}`">
							<VAvatar
								:color="props.job.company_logo ? '' : 'primary'"
								:variant="!props.job.company_logo ? 'tonal' : undefined"
								size="x-large"
								class="mb-2"
							>
								<VImg
									v-if="props.job.company_logo"
									:src="`http://127.0.0.1:8000/storage/${props.job.company_logo}`"
								/>
								<span v-else>{{ avatarText(props.job.company_name) }}</span>
							</VAvatar>
							<!-- job title  -->
							<p class="text-h6 font-weight-bold">{{ props.job.title }}</p>
						</NuxtLink>
						<!-- company name and job location  -->
						<p class="mt-2">
							<VChip prepend-icon="mdi-domain" class="me-4">{{
								props.job.company_name
							}}</VChip>
							<VChip color="primary" prepend-icon="mdi-pin">{{
								props.job.location
							}}</VChip>
						</p>
					</div>
				</VCardText>
				<!-- job pay  -->
				<div class="d-flex justify-space-between align-center mt-4">
					<div class="text-h6 font-weight-bold">
						${{ props.job.pay }}/<span class="text-subtitle-2">Year</span>
					</div>
					<!-- save job button  -->
					<VBtn
						:disabled="!loginToken"
						variant="tonal"
						color="#FA7070"
						@click="emits('handleSaveJob', props.job)"
						>Save Job
					</VBtn>
					<VTooltip v-if="!loginToken" activator="parent" location="end"
						>sign in to save</VTooltip
					>
				</div>
			</VCard>
		</div>
	</div>
</template>

<style scoped>
a {
	color: unset;
	text-decoration: none;
}

a:hover {
	color: #fa7070;
}
</style>
