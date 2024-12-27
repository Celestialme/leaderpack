<script lang="ts">
	import { notification } from '@src/store.svelte';
	import FloatingInput from './FloatingInput.svelte';
	import locales from '@src/locales.svelte';
	import axios from 'axios';
	import { obj2formData } from '@src/utils';

	interface Props {
		show?: boolean;
	}

	let { show = $bindable(false) }: Props = $props();
	function send() {
		if (!name)
			return notification().set({
				message: locales.nameError(),
				type: 'error',
				timeOut: 1500
			});
		else if (!email && !phoneNumber) {
			return notification().set({
				message: locales.emailOrNumberError(),
				type: 'error',
				timeOut: 1500
			});
		}
		show = false;
		notification().set({ message: locales.orderPlaced(), type: 'success', timeOut: 3000 });
		axios.post(
			'/api/mail',
			obj2formData({
				name,
				email,
				phoneNumber,
				message,
				url: window.location.href
			})
		);
	}
	let name = $state('');
	let email = $state('');
	let phoneNumber = $state('');
	let message = $state('');
</script>

<div
	onclick={() => (show = false)}
	class="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black opacity-50"
></div>

<div
	class="fixed left-1/2 top-1/2 z-50 flex h-[500px] w-[600px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-auto rounded-md bg-white p-[50px] pb-[30px]"
>
	<FloatingInput bind:value={name} label={locales.name()} name="name" type="text" />
	<FloatingInput bind:value={email} label={locales.mail()} name="email" type="text" />
	<FloatingInput bind:value={phoneNumber} label={locales.phone()} name="phoneNumber" type="text" />
	<div class="relative flex-grow">
		<textarea
			bind:value={message}
			placeholder=""
			class="h-full w-full resize-none border-2 border-solid border-gray-300 font-Poppins outline-none"
			name="message"
		></textarea>
		<p class="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-Poppins">
			{locales.extraInformation()}
		</p>
	</div>
	<button
		onclick={send}
		class="mt-auto w-full rounded-md bg-[#609966] px-[10px] py-1 font-Poppins text-[20px] font-[700] text-white active:scale-90"
		>{locales.send()}</button
	>
</div>

<style>
	textarea:placeholder-shown + p {
		display: block;
		opacity: 0.6;
	}
</style>
