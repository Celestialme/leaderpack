export type Category = {
	id: string;
	title_en: string;
	title_ka: string;
	imageURL: string;
};
export type Blog = {
	id: string;
	title_en: string;
	title_ka: string;
	imageURL: string;
};
export type CategoryData = { [key in 'en' | 'ka']: { title: string } } & {
	id?: string;
	image: File | null | string;
};
export type ProductData = {
	[key in 'en' | 'ka']: {
		title: string;
		description: string;
		sizes: string;
		material: string;
		colors: string;
		options: string;
		details: string;
	};
} & {
	id?: string;
	images: { array: ImageFile[]; string: string };
	branding: number;
	relatedProducts: { array: Product[]; string: string };
};
export type Product = {
	id: string;
	category_id: string;
	title_en: string;
	title_ka: string;
	description_en: string;
	description_ka: string;
	material_en: string;
	material_ka: string;
	sizes_en: string;
	sizes_ka: string;
	colors_en: string;
	colors_ka: string;
	options_en: string;
	options_ka: string;
	details_en: string;
	details_ka: string;
	branding: number;
	relatedProducts: string;
	images: string;
};
export type ImageFile = File & { meta_data: { thumbnail: boolean; branded: boolean } };
export type UploadedImage = {
	id: string;
	url: string;
	name: string;
	thumbnail: boolean;
	branded: boolean;
	deleted: boolean;
};
export type Mode = 'create' | 'edit';
