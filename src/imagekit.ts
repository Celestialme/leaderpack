import ImageKit from 'imagekit';
import crypto from 'crypto';
import { privateKey, publicKey, urlEndpoint } from '$env/static/private';
let imageKit = new ImageKit({
	privateKey: privateKey,
	publicKey: publicKey,
	urlEndpoint: urlEndpoint
});

export async function uploadImage(file: File, folder: string) {
	let buffer = Buffer.from(await file.arrayBuffer());

	return await imageKit
		.upload({
			file: buffer,
			fileName: file.name,
			folder: 'LeaderPack/' + folder,
			useUniqueFileName: true,
			isPrivateFile: false
		})
		.then((res) => ({ url: res.url, name: res.name, id: res.fileId }));
}
export async function deleteImage(id: string) {
	return await imageKit.deleteFile(id);
}
export default imageKit;
