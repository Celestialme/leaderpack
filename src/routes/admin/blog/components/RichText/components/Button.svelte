<script>
	export let textColor = 'white';
	export let bgColor = 'gray';
	export let border = 'none;';
	export let hoverColor = '#4fdc4f';
	export let style = '';
</script>

<button
	on:click
	class={$$props.class}
	style={`color: ${textColor}; background-color: ${bgColor}; border: ${border}; --hover-color: ${hoverColor}; ${style};`}
>
	<slot />
</button>

<style>
	button {
		padding: 10px min(20px, 15%);
		text-align: center;
		border-radius: 6px;
		transition: background-color 0.2s ease-in-out;
		user-select: none;
		max-width: 100%;
		min-width: 50px;
	}
	button:hover {
		background-color: var(--hover-color) !important;
	}
	button:active {
		transform: scale(0.9);
	}
</style>
