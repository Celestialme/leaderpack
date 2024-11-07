<script lang="ts">
	interface Props {
		name: string;
		label: string;
		type?: 'password' | 'text' | 'email';
		value?: string;
		onkeydown?: (event: KeyboardEvent) => void;
		oninput?: (event: Event) => void;
	}

	let { name, label, type = 'text', value = $bindable(''), ...props }: Props = $props();

	let inputElement = $state() as HTMLInputElement;

	function initInput(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div class="container relative my-1">
	<input
		class="bg-transparent text-black"
		bind:this={inputElement}
		use:initInput
		placeholder=" "
		type="text"
		{name}
		id="input"
		bind:value
		{...props}
	/>
	<label for="input">{label} </label>
</div>

<style>
	.container {
		position: relative;
		display: flex;
		width: 100%;
		border-bottom: 1px solid #242728;
		padding: 5px 0px;
		gap: 10px;
		align-items: center;
	}

	input {
		display: inline-block;
		border: none;
		outline: none;
		width: 100%;

		padding: 5px 0;
	}
	label {
		position: absolute;
		left: 0;
		top: 100%;
		margin-top: -10px;
		transform: translateY(-100%);
		pointer-events: none;
		transition: 0.2s;
		color: rgba(0, 0, 0, 0.595);
		font-size: 15px;
		font-family: Poppins;
	}
	input:focus + label {
		top: unset;
		top: 0;
		left: 0;
		transform: translateY(0);
		color: #45e9ff;
		font-size: 15px;
	}

	input:not(:global(:placeholder-shown)) + label {
		top: unset;
		top: 0;
		margin-top: -10px;
		transform: translateY(0);
	}
</style>
