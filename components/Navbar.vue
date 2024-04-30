<script setup lang="ts">
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
let loginToken = process.client ? localStorage.getItem('loginToken') : null
const isAuthenticated = ref<boolean>(loginToken !== null)
// items for menu
const items = [
	{ title: 'Applications', to: '/applications' },
	{ title: 'Saved Jobs', to: '/savedJobs' },
	{ title: 'All Jobs', to: '/allJobs' }
]

// manage user logout
const handleLogout = async () => {
	try {
		const response = await axios.post(
			'/logout',
			null, // No data
			{
				headers: {
					Authorization: `Bearer ${loginToken}`
				}
			}
		)
		if (response) {
			// show confirmation 
			setTimeout(() => {
				useNuxtApp().$toast.info('Logged out successfully!!')
			}, 500);
            router.push({ path: '/login' })
			// remove items from localStorage
			if (process.client) {
				localStorage.removeItem('loginToken')
				localStorage.removeItem('savedJobs')
				localStorage.removeItem('userEmail')
			}
		}
	} catch (error: any) {
		if (error.response) {
			useNuxtApp().$toast.error(`${error.response.data.message}`)
		}
	}
}

// watch for any changes in the isAuthenticated's value
watchEffect(() => {
	isAuthenticated.value
})
</script>

<template>
	<div>
		<div class="d-flex justify-space-between align-center">
			<NuxtLink to="/">
				<h1>Job HUNT</h1>
			</NuxtLink>
			<div class="d-flex justify-space-between align-center ga-4">
				<!-- back to home link  -->
				<NuxtLink to="/">
					<VBtn variant="tonal"> Home </VBtn>
				</NuxtLink>
				<!-- conditionaly rendered login / logout button on isAuthenticated -->
				<NuxtLink v-if="!isAuthenticated" to="/login">
					<VBtn prepend-icon="mdi-login" variant="tonal"> sign in</VBtn>
				</NuxtLink>
				<VBtn
					v-else
					prepend-icon="mdi-login"
					variant="tonal"
					@click="handleLogout"
				>
					Log Out</VBtn
				>
				<!-- navbar menu  -->
				<VMenu v-if="isAuthenticated">
					<!-- navbar menu icon  -->
					<template v-slot:activator="{ props }">
						<VBtn v-bind="props" variant="text" rounded="0">
							<VIcon size="large" class="pa-0 text-h4">mdi-menu</VIcon>
						</VBtn>
					</template>
					<!-- navbar menu items  -->
					<VList id="menu">
						<VListItem
							v-for="(item, index) in items"
							:key="index"
							:value="index"
							background-color="#FA7070"
						>
							<NuxtLink :to="item.to">
								<VListItemTitle id="menuItems"
									>{{ item.title }}
								</VListItemTitle>
							</NuxtLink>
						</VListItem>
					</VList>
				</VMenu>
			</div>
		</div>
	</div>
</template>

<style scoped>
a {
	text-decoration: none;
	color: unset;
}
/* styles for navbar menu items  */
#menuItems {
	color: #fa7070;
}
/* styles for navbar menu   */
#menu {
	background-color: #fefded;
}
</style>
