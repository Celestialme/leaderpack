<script lang="ts">
	let {
		textColor = 'white',
		bgColor = 'gray',
		border = 'none;',
		hoverColor = '#4fdc4f',
		style = '',
		children,
		...props
	}: {
		textColor?: string;
		bgColor?: string;
		border?: string;
		hoverColor?: string;
		style?: string;
		children?: import('svelte').Snippet;
	} = $props();
</script>

<button
	{...props}
	style={`color: ${textColor}; background-color: ${bgColor}; border: ${border}; --hover-color: ${hoverColor}; ${style};`}
>
	{@render children?.()}
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
