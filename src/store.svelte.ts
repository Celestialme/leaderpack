import { untrack } from 'svelte';
import type { ProductData } from './types';
export let language = store<'en' | 'ka'>('en');
export let contact_el = store<HTMLDivElement>();
export let products_el = store<HTMLDivElement>();
export let header_el = store<HTMLDivElement>();

export let notification = store({
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
		notification.update((n) => {
			return { ...n, message, type };
		});
	},
	clear() {
		notification.update((n) => {
			return { ...n, message: '', type: '' };
		});
	}
});

export let productData = store<ProductData>({
	images: { array: [], string: '' },
	branding: 0,
	relatedProducts: { array: [], string: '' },
	en: {
		title: '',
		description: '',
		sizes: '',
		material: '',
		colors: '',
		details: '',
		options: ''
	},
	ka: {
		title: '',
		description: '',
		sizes: '',
		material: '',
		colors: '',
		details: '',
		options: ''
	}
});

interface Store<T> {
	(): T;
	value: T;
	update: (f: (value: T) => T) => void;
	subscribe: (f: (value: T) => void) => () => void;
	set: (value: T) => void;
	trigger: () => void;
	refresh: () => void;
}
export function store<T>(v?: T) {
	let copy = v as T;
	let value = $state(v) as T;
	let f = (() => value) as Store<T>;

	f.update = (f) => {
		value = f(value);
	};
	f.set = (v: T) => {
		value = v;
	};
	f.subscribe = (f) => {
		return $effect.root(() => {
			track(
				() => f(value),
				() => value
			);
		});
	};
	f.trigger = () => {
		let _value = value;
		value = null as any;
		value = _value;
	};
	f.refresh = () => {
		value = null as any;
		value = copy;
	};
	Object.defineProperty(f, 'value', {
		get: () => value,
		set: (v) => (value = v)
	});
	return f;
}

export function track(f: () => unknown, deps: () => any) {
	$effect(() => {
		untrack(f);
		deps();
	});
}
