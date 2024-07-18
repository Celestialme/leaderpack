import { writable, type Writable } from 'svelte/store';

export let products_el: Writable<HTMLDivElement> = writable();
export let products_el_ready = new Promise((resolve) => {
	products_el.subscribe((d) => {
		if (d) resolve(d);
	});
});
export let contact_el: Writable<HTMLDivElement> = writable();
export let header: Writable<HTMLDivElement> = writable();
export let data: Writable<
	{
		title: string;
		thumbnail: string;
		items: { title: string; description: string }[];
	}[]
> = writable([]);

fetch('/products.json').then(async (res) => data.set(await res.json()));
