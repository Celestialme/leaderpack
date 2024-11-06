import {
	deleteCategory,
	getCategories,
	getCategory,
	insertCategory,
	updateCategory
} from '@src/db';
import { uploadImage } from '@src/imagekit';
import crypto from 'crypto';
export async function GET({ url }) {
	let id = url.searchParams.get('id') as string;
	if (id) {
		let category = await getCategory({ id });
		return new Response(JSON.stringify(category));
	} else {
		let categories = await getCategories();
		return new Response(JSON.stringify(categories));
	}
}
export async function PUT({ request }) {
	let data = await request.formData();
	let en = JSON.parse(data.get('en') as string);
	let ka = JSON.parse(data.get('ka') as string);
	let file = data.get('image') as File;
	let category_id = crypto.randomBytes(16).toString('hex');
	let { url: imageURL } = await uploadImage(file, category_id);
	await insertCategory({ id: category_id, title_en: en.title, title_ka: ka.title, imageURL });
	return new Response();
}

export async function PATCH({ request }) {
	let data = await request.formData();
	let category_id = data.get('id') as string;
	let en = JSON.parse(data.get('en') as string);
	let ka = JSON.parse(data.get('ka') as string);
	let file = data.get('image') as File;

	let { url: imageURL } =
		file instanceof File ? await uploadImage(file, category_id) : { url: file };
	await updateCategory({ id: category_id, title_en: en.title, title_ka: ka.title, imageURL });
	return new Response();
}

export async function DELETE({ url }) {
	let id = url.searchParams.get('id') as string;
	await deleteCategory({ id });
	return new Response();
}
