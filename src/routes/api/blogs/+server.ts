import { deleteBlog, getBlog, getBlogs, insertBlog, updateBlog } from '@src/db';
import imageKit, { deleteImage, uploadImage } from '@src/imagekit.js';
import crypto from 'crypto';
export async function GET({ url }) {
	let blog = url.searchParams.get('blog') as string;
	if (blog) {
		let data = (await getBlog({ blog })) || null;
		return new Response(JSON.stringify(data));
	} else {
		let data = await getBlogs();
		return new Response(JSON.stringify(data));
	}
}

export async function PUT({ request }) {
	let data = await request.formData();
	let { header, content, description } = JSON.parse(data.get('data') as string);
	let images = data.getAll('images') as File[];
	let thumbnail = data.get('thumbnail') as File;

	let blog_id = crypto.randomBytes(16).toString('hex');
	await saveImages({ blog_id, content, images });
	let { url: thumbnail_url } = await uploadImage(thumbnail, 'blog/' + blog_id, false, 'thumbnail');
	await insertBlog({
		id: blog_id,
		title_en: header.en || '',
		title_ka: header.ka || '',
		content_en: content.en || '',
		content_ka: content.ka || '',
		description_en: description.en || '',
		description_ka: description.ka || '',
		relatedBlogs: '',
		thumbnail: thumbnail_url
	});

	return new Response();
}

export async function DELETE({ url }) {
	let id = url.searchParams.get('id') as string;
	await deleteBlog({ id });
	await imageKit.deleteFolder(`LeaderPack/blog/${id}`).catch(() => {});
	return new Response();
}

export async function PATCH({ request }) {
	let data = await request.formData();
	let { header, content, description } = JSON.parse(data.get('data') as string);
	let id = data.get('id') as string;
	let images = data.getAll('images') as File[];
	let thumbnail = data.get('thumbnail') as File;
	let relatedBlogs = data.get('relatedBlogs') as string;
	let storage_data = JSON.parse(data.get('storage_data') as string) as {
		data: { storage_images: { removed: string[] } };
	};
	for (let removed of storage_data?.data?.storage_images?.removed || []) {
		await deleteImage(removed).catch(() => {});
	}
	await saveImages({ blog_id: id, content, images });
	let { url: thumbnail_url } =
		thumbnail instanceof File
			? await uploadImage(thumbnail, 'blog/' + id, false, 'thumbnail')
			: { url: thumbnail };

	await updateBlog({
		id,
		title_en: header.en || '',
		title_ka: header.ka || '',
		content_en: content.en || '',
		content_ka: content.ka || '',
		description_en: description.en || '',
		description_ka: description.ka || '',
		relatedBlogs: relatedBlogs || '',
		thumbnail: thumbnail_url || ''
	});
	return new Response();
}

async function saveImages({
	blog_id,
	content,
	images
}: {
	blog_id: string;
	content: { [key: string]: string };
	images: File[];
}) {
	let _images: { [key: string]: string | File } = {};
	for (let id of (Object.values(content).join('\n') as string).matchAll(
		/storage_image="(.+?)"/gms
	)) {
		// images from richtext content itself
		_images[id[1]] = id[1];
	}

	let uploaded_images = await Promise.all(
		images.map(async (image) => {
			return await uploadImage(image, 'blog/' + blog_id);
		})
	);
	for (let image of uploaded_images) {
		for (let lang in content) {
			content[lang] = content[lang].replace(
				`src="${image.name}"`,
				`src="${image.url}" storage_image="${image.id}"`
			);
		}
	}
}
