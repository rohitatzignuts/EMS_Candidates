<template>
	<div class="main">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style scoped>
.main {
	--color: #7272724d;
	background-color: #fefded;
	background-image: linear-gradient(
			0deg,
			transparent 24%,
			var(--color) 25%,
			var(--color) 26%,
			transparent 27%,
			transparent 74%,
			var(--color) 75%,
			var(--color) 76%,
			transparent 77%,
			transparent
		),
		linear-gradient(
			90deg,
			transparent 24%,
			var(--color) 25%,
			var(--color) 26%,
			transparent 27%,
			transparent 74%,
			var(--color) 75%,
			var(--color) 76%,
			transparent 77%,
			transparent
		);
	background-size: 55px 55px;
	background-repeat: repeat;
}
</style>
