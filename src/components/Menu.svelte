<script lang="ts">
	import { contact_el, language } from '@src/store.svelte';
	import Search from './Search.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Hamburger from './Hamburger.svelte';
	import Language from './Language.svelte';

	export let show = false;
	let items: { [key: string]: () => void } = {
		'ჩვენს შესახებ': () => {
			goto(`/${$page.params.language}/about`);
		},
		ბლოგი: () => {
			goto(`/${$page.params.language}/blog`);
			show = false;
		},
		კონტაქტი: async () => {
			if (!contact_el.value) {
				await goto(`/${$page.params.language}`);
			}
			let unsub = contact_el.subscribe(async (el) => {
				if (el) {
					setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
					unsub();
				}
			});
		}
	};
	$: {
		if (browser) document?.body?.classList.toggle('!overflow-hidden', show);
	}
</script>

<!-- backdrop -->
<div
	class:hidden={!show}
	onclick={() => (show = false)}
	class="fixed left-0 top-0 z-[200] h-screen w-screen bg-black opacity-30 md:hidden"
></div>
<div class="menu_wrapper md:hidden" class:FadeIn={show}>
	<Language class="absolute left-2 top-[20px]" bind:language={language.value}></Language>
	<Hamburger
		opened={true}
		class="absolute right-2 top-[20px] w-[30px] fill-white"
		onclick={() => (show = false)}
	></Hamburger>
	<!-- menu items -->
	<div class="menu">
		<Search class="w-full"></Search>
		{#each Object.keys(items) as item}
			<div class="select-none rounded-md bg-[#0000002e] p-[10px]">
				<p
					onclick={() => {
						items[item]();
						show = false;
					}}
					class=" text-[16px]"
				>
					{item}
				</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.menu_wrapper {
		position: fixed;
		width: 500px;
		max-width: calc(100vw - 20px);
		top: 0px;
		bottom: 0px;
		right: 0px;
		z-index: 201;
		background-color: #c2ffff1a;
		backdrop-filter: blur(15px);
		margin-left: auto;
		padding-top: 90px;
		opacity: 0;
		transform: translate(100%, 0);
		transition: 0.2s ease-out;
		transition-property: transform opacity;
		border-radius: 6px;
	}
	.FadeIn {
		opacity: 1;
		transform: translate(0, 0);
	}
	.menu {
		height: 100%;
		z-index: 20;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		overflow-y: auto;
		padding-right: 20px;
	}
	p {
		position: relative;

		font-family: Poppins;
		color: white;
		cursor: pointer;
	}
	p::after {
		content: '';
		position: absolute;
		width: 0;
		transition: width 0.3s ease-in-out;
		left: 50%;
		transform: translate(-50%);
		bottom: -5px;
		height: 2px;
		background-color: white;
	}
	p:hover::after {
		width: 100%;
	}
</style>
