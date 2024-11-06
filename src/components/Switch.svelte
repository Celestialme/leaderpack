<script lang="ts">
	export let checked = 0;
</script>

<div
	on:click={() => (checked = checked ? 0 : 1)}
	class="h-[30px] w-[68px] cursor-pointer rounded-md bg-gray-500 p-[4px] transition"
	class:checked
>
	<div class="h-full w-[30px] rounded-md bg-white transition"></div>
</div>

<style>
	.checked div {
		transform: translate(100%);
	}
	.checked {
		background-color: rgb(12, 190, 190);
	}
</style>
