import { untrack } from 'svelte';
export let language = store<'en' | 'ka'>('en');
export let contact_el = store<HTMLDivElement>();
export let products_el = store<HTMLDivElement>();

export let inputError = store({
	message: '',
	type: '',
	set({
		message,
		type,
		timeOut
	}: {
		message: string;
		type: 'success' | 'error';
		timeOut?: number;
	}) {
		if (timeOut) {
			setTimeout(() => {
				this.clear();
			}, timeOut);
		}
		inputError.update((n) => {
			return { ...n, message, type };
		});
	},
	clear() {
		inputError.update((n) => {
			return { ...n, message: '', type: '' };
		});
	}
});

export function store<T>(v?: T) {
	let value = $state(v) as T;
	return {
		get value() {
			return value;
		},
		set value(v) {
			value = v;
		},
		set(v: T) {
			value = v;
		},
		update(f: (value: T) => T) {
			value = f(value);
		},
		subscribe(f: (value: T) => void) {
			let _f = untrack(() => f);
			return $effect.root(() => {
				$effect(() => {
					_f(value);
				});
			});
		}
	};
}

export function track(f: () => unknown, deps: () => any) {
	$effect(() => {
		untrack(f);
		deps();
	});
}
