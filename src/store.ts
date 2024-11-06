import { writable, type Writable } from 'svelte/store';
import type { Category } from './types';

export let products_el: Writable<HTMLDivElement> = writable();

export let language: Writable<'en' | 'ka'> = writable('en');
export let contact_el: Writable<HTMLDivElement> = writable();
export let header: Writable<HTMLDivElement> = writable();
export let categories: Writable<Category[]> = writable([]);
export let inputError = writable({
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
