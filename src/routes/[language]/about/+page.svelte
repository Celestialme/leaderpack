<script lang="ts">
	import Header from '@src/components/Header.svelte';
	import locales from '@src/locales.svelte';
</script>

<Header></Header>
<div class="flex w-full flex-col">
	<div
		class="mx-auto my-auto flex max-h-[80%] w-[1000px] max-w-[90%] flex-grow flex-col items-center rounded-lg p-4 shadow"
	>
		<h1 class="mb-[20px] font-Poppins text-[22px] font-[700]">{locales.leaderPack()}</h1>
		<p class="text-justify font-Poppins text-[20px] font-[400]">
			{locales.about_content()}
		</p>
	</div>
</div>
