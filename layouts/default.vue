
<template>
	<div>
		<!-- default layout for the website -->
		<VLayout>
			<VAppBar color="#FA7070">
				<VContainer>
					<!-- navbar -->
                    <Navbar />
				</VContainer>
			</VAppBar>
			<VMain>
				<div class="main">
					<slot />
				</div>
			</VMain>
		</VLayout>
		<Footer />
	</div>
</template>
