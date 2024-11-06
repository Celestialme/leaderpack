export let storage_data: {
	data: { [key: string]: any };
	add: (key: 'storage_images_remove', data: string[]) => void;
	clear: () => void;
	get: () => { [key: string]: any };
	is_empty: () => boolean;
} = {
	data: {},
	add(key, data) {
		switch (key) {
			case 'storage_images_remove':
				if (!this.data?.storage_images) this.data.storage_images = { removed: [] };
				this.data.storage_images.removed.push(...data);
				break;
		}
	},
	get() {
		return this.data;
	},
	clear() {
		this.data = {};
	},
	is_empty() {
		return Object.keys(this.data).length === 0;
	}
};

export let createRandomID = (id?: string) => {
	return id
		? id
		: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
export function debounce(delay?: number) {
	let timer: NodeJS.Timeout | undefined;
	let first = true;
	return (fn: () => void) => {
		if (first) {
			fn();
			first = false;
			clearTimeout(timer);
			timer = setTimeout(() => {
				first = true;
			}, delay);
			return;
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn();
			first = true;
		}, delay);
	};
}

export function obj2formData(obj: any) {
	let formData = new FormData();
	for (let key in obj) {
		if (key == 'images') {
			for (let [id, image] of Object.entries(obj[key]) as [string, File][]) {
				formData.append('images', image, id);
			}
		} else if (obj[key] instanceof File || obj[key] instanceof Blob || typeof obj[key] != 'object')
			formData.append(key, obj[key]);
		else formData.append(key, JSON.stringify(obj[key]));
	}
	return formData;
}
