import { untrack } from 'svelte';

export let language = store<'en' | 'ka'>('en');

export function store<T>(v: T) {
	let value = $state(v);
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
		update(f: Function) {
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
