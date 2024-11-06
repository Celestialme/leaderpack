<script lang="ts">
	import { enhance } from '$app/forms';
	let result: 'error' | 'success' | 'redirect' | 'failure';
	import FloatingInput from '@src/components/FloatingInput.svelte';
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<form
		class="flex flex-col gap-2 rounded-md border-2 border-solid border-gray-400 p-[50px] px-[120px] shadow-2xl"
		action="?/login"
		method="POST"
		use:enhance={() =>
			async ({ result: _result }) => {
				result = _result.type;
			}}
	>
		<FloatingInput label="password" name="password" type="password" />
		<button class="mt-2 bg-green-600 p-2 text-white active:scale-90" type="submit">Login</button>
		{#if result == 'error'}
			<p class="mx-auto text-red-600">Wrong password</p>
		{:else if result == 'success'}
			<p class="mx-auto text-green-600">Logged in, redirecting...</p>
			{(setTimeout(() => (window.location.href = '/admin'), 1000), '')}
		{/if}
	</form>
</div>
