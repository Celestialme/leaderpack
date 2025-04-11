<script lang="ts">
	interface Props {
		type?: 'text' | 'password' | 'email';
		show?: boolean;
		label?: string;
		class?: string;
		labelClass?: string;
		inputClass?: string;
		placeholder?: string;
		value?: string;
		onsubmit?: (value: string) => void;
	}

	let {
		type = 'text',
		label = '',
		show = true,
		class: className = '',
		labelClass = '',
		inputClass = '',
		placeholder = '',
		value = $bindable(),
		onsubmit = (value: string) => {},
		...props
	}: Props = $props();
	function typeAction(node: HTMLInputElement) {
		node.type = type;
		node.onkeydown = (e) => {
			if (e.key === 'Enter') {
				onsubmit(node.value);
			}
		};
	}
</script>

{#if show}
	<div class="w-full {className}">
		{#if label}
			<label for="input" class={labelClass}>{label}</label>
		{/if}
		<input use:typeAction id="input" class={inputClass} bind:value {placeholder} {...props} />
	</div>
{/if}

<style>
	div {
		max-width: 100%;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	label {
		margin-right: 10px;
	}
	input {
		box-sizing: border-box;
		border: 1px solid #c1c1c1;
		border-radius: 4px;
		padding: 5px;
		color: black;
		padding-right: 18px;
		outline-color: #65caec;
		max-width: 100%;
		width: 350px;
	}
</style>
