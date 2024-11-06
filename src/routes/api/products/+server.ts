import { deleteProduct, getProduct, getProducts, insertProduct, updateProduct } from '@src/db';
import imageKit, { deleteImage, uploadImage } from '@src/imagekit';
import type { ImageFile, UploadedImage } from '@src/types';
import crypto from 'crypto';
export async function GET({ url }) {
	let category_id = url.searchParams.get('category_id') as string;
	let category = url.searchParams.get('category') as string;
	let product = url.searchParams.get('product') as string;

	let products;
	if (product) {
		products = await getProduct(product);
	} else if (category_id) {
		products = await getProducts({ category_id });
	} else if (category) {
		products = await getProducts({ category });
	} else {
		products = await getProducts({ all: true });
	}
	return new Response(JSON.stringify(products));
}
export async function PUT({ request }) {
	let data = await request.formData();
	let category_id = data.get('category_id') as string;
	let en = JSON.parse(data.get('en') as string);
	let ka = JSON.parse(data.get('ka') as string);
	let images = data.getAll('images') as File[] | string;
	let meta_data = JSON.parse(data.get('meta_data') as string) as {
		[key: string]: ImageFile['meta_data'];
	};

	let branding = parseInt(data.get('branding') as string);
	let relatedProducts = data.get('relatedProducts') as string;
	let uploads = [];
	let product_id = crypto.randomBytes(16).toString('hex');
	for (let i = 0; i < images.length; i++) {
		if (images[i] instanceof File == false) continue;
		uploads.push(
			new Promise(async (resolve) => {
				let file = images[i] as File;
				let _meta_data = meta_data[file.name];
				let { url, name, id } = await uploadImage(file, `${category_id}/${product_id}`);

				resolve({ id, url, name, ..._meta_data });
			})
		);
	}
	let imagesJSON = JSON.stringify(await Promise.all(uploads));

	await insertProduct({
		id: product_id,
		category_id,
		title_en: en.title,
		title_ka: ka.title,
		description_en: en.description,
		description_ka: ka.description,
		material_en: en.material,
		material_ka: ka.material,
		sizes_en: en.sizes,
		sizes_ka: ka.sizes,
		colors_en: en.colors,
		colors_ka: ka.colors,
		options_en: en.options,
		options_ka: ka.options,
		details_en: en.details,
		details_ka: ka.details,
		branding: branding,
		relatedProducts,
		images: imagesJSON
	});
	return new Response();
}
export async function PATCH({ request }) {
	let data = await request.formData();
	let product_id = data.get('id') as string;
	let category_id = data.get('category_id') as string;
	let branding = parseInt(data.get('branding') as string);
	let en = JSON.parse(data.get('en') as string);
	let ka = JSON.parse(data.get('ka') as string);

	let relatedProducts = data.get('relatedProducts') as string;

	let images = data.getAll('images') as File[] | string;
	let meta_data = JSON.parse(data.get('meta_data') as string) as {
		[key: string]: ImageFile['meta_data'];
	};
	let uploads = [];
	let imagesJSON = '[]';
	let uploadedImages: UploadedImage[] = [];
	for (let i = 0; i < images.length; i++) {
		if (images[i] instanceof File) {
			uploads.push(
				new Promise(async (resolve) => {
					let file = images[i] as File;
					let _meta_data = meta_data[file.name];
					let { url, name, id } = await uploadImage(file, `${category_id}/${product_id}`);

					resolve({ id, url, name, ..._meta_data });
				})
			);
		} else {
			uploadedImages = JSON.parse(images[i] as string) as UploadedImage[];

			uploadedImages = uploadedImages.filter((image) => {
				if (!image.deleted) return true;

				deleteImage(image.id).catch((err) => {
					console.log(err);
				});
				return false;
			});
		}
	}
	imagesJSON = JSON.stringify([...(await Promise.all(uploads)), ...uploadedImages]);
	await updateProduct({
		id: product_id,
		category_id,
		title_en: en.title,
		title_ka: ka.title,
		description_en: en.description,
		description_ka: ka.description,
		material_en: en.material,
		material_ka: ka.material,
		sizes_en: en.sizes,
		sizes_ka: ka.sizes,
		colors_en: en.colors,
		colors_ka: ka.colors,
		options_en: en.options,
		options_ka: ka.options,
		details_en: en.details,
		details_ka: ka.details,
		branding,
		relatedProducts,
		images: imagesJSON
	});
	return new Response();
}

export async function DELETE({ url }) {
	let product_id = url.searchParams.get('product_id') as string;
	let category_id = url.searchParams.get('category_id') as string;
	await deleteProduct({ id: product_id });
	await imageKit.deleteFolder(`LeaderPack/${category_id}/${product_id}`);
	return new Response();
}
