<script lang="ts">
	import FloatingInput from './FloatingInput.svelte';

	export let show = false;
	function send() {
		show = false;
	}
</script>

<div
	on:click={() => (show = false)}
	class="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black opacity-50"
></div>

<div
	class="fixed left-1/2 top-1/2 z-50 flex h-[500px] w-[600px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-auto rounded-md bg-white p-[50px] pb-[30px]"
>
	<div class="flex gap-3">
		<FloatingInput label="name" name="name" type="text" />
		<FloatingInput label="last name" name="lastName" type="text" />
	</div>
	<FloatingInput label="email" name="email" type="text" />
	<FloatingInput label="phone number" name="phoneNumber" type="text" />
	<div class="relative flex-grow">
		<textarea
			placeholder=""
			class="h-full w-full border-2 border-solid border-gray-300 font-Poppins"
			name="message"
		></textarea>
		<p class="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-Poppins">
			Extra Information
		</p>
	</div>
	<button
		on:click={send}
		class="mt-auto w-full rounded-md bg-[#609966] px-[10px] py-1 font-Poppins text-[20px] font-[700] text-white active:scale-90"
		>Send</button
	>
</div>

<style>
	textarea:placeholder-shown + p {
		display: block;
		opacity: 0.6;
	}
</style>
