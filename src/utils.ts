import type { Page } from '@sveltejs/kit';

import { get, type Readable } from 'svelte/store';
import type { ImageFile, Product, UploadedImage } from './types';

export let throttle = (delay: number) => {
	let first = true;
	let timer: any;
	return (fn: () => void) => {
		if (first) {
			fn();
			first = false;
			return;
		}
		if (timer) return;
		timer = setTimeout(() => {
			fn();
			timer = undefined;
		}, delay);
	};
};

if (!String.prototype.intoSlug) {
	String.prototype.intoSlug = function (this: string): string {
		console.log(this);
		return this.replace(/\s+/g, '_');
	};
}

export function obj2formData(obj: any) {
	let formData = new FormData();
	for (let key in obj) {
		if (key == 'images') {
			let meta_data: { [key: string]: any } = {};
			for (let image of obj[key].array as ImageFile[]) {
				formData.append('images', image, image.name);
				meta_data[image.name] = image.meta_data;
			}
			formData.append('images', obj[key].string);
			formData.append('meta_data', JSON.stringify(meta_data));
		} else if (obj[key] instanceof File || obj[key] instanceof Blob || typeof obj[key] != 'object')
			formData.append(key, obj[key]);
		else formData.append(key, JSON.stringify(obj[key]));
	}
	return formData;
}
export function replaceParams(
	page: Readable<Page>,
	updater: { [key: keyof Page['params']]: string }
) {
	let $page = get(page);
	let url = $page.route.id;
	if (!url) return '/';
	for (let key in updater) {
		url = url.replace(`[${key}]`, updater[key]);
	}
	for (let key in $page.params) {
		url = url.replace(`[${key}]`, $page.params[key]);
	}

	return url + $page.url.search;
}

export function createScroll(node: HTMLElement) {
	let track = document.createElement('div');
	track.className = 'h-[20px] w-full bg-gray-400 ';
	let thumb = document.createElement('div');
	thumb.className = 'relative h-full bg-gray-600 touch-none cursor-pointer';
	let thumb_pos = 0;
	function resize() {
		track.style.width = node.offsetWidth + 'px';
		thumb.style.width = `${(node.offsetWidth / node.scrollWidth) * 100}%`;
		thumb_pos = clamp(thumb_pos, 0, track.offsetWidth - thumb.offsetWidth);
		thumb.style.transform = `translateX(${thumb_pos}px)`;
	}
	resize();
	window.addEventListener('resize', resize);
	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max);
	}
	function onScroll() {
		thumb_pos = (node.scrollLeft * track.offsetWidth) / node.scrollWidth;
		thumb.style.transform = `translateX(${thumb_pos}px)`;
	}
	node.onscroll = onScroll;
	thumb.onpointerdown = (e) => {
		thumb.setPointerCapture(e.pointerId);
		node.onscroll = null;
		thumb.onpointermove = (e) => {
			thumb_pos += e.movementX;
			node.scrollTo((thumb_pos / track.offsetWidth) * node.scrollWidth, 0);
			thumb_pos = clamp(thumb_pos, 0, track.offsetWidth - thumb.offsetWidth);
			thumb.style.transform = `translateX(${thumb_pos}px)`;
		};

		thumb.onpointerup = () => {
			thumb.onpointermove = null;
			thumb.onpointerup = null;
			node.onscroll = onScroll;
		};
	};
	track.appendChild(thumb);

	if (node.parentElement) node.parentElement.appendChild(track);
}
export function getProductThumbnail(product: Product) {
	let images = JSON.parse(product.images) as UploadedImage[];
	return images.find((i) => i.thumbnail == true)?.url;
}
