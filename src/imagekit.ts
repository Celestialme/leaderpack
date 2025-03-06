import ImageKit from 'imagekit';
import crypto from 'crypto';
import { privateKey, publicKey, urlEndpoint } from '$env/static/private';

let imageKit = new ImageKit({
	privateKey: privateKey,
	publicKey: publicKey,
	urlEndpoint: urlEndpoint
});

export async function uploadImage(file: File, folder: string, unique = true, name = 'IMAGE') {
	let buffer = Buffer.from(await file.arrayBuffer());

	return await imageKit
		.upload({
			file: buffer,
			fileName: name,
			folder: 'LeaderPack/' + folder,
			useUniqueFileName: unique,
			isPrivateFile: false,
			overwriteFile: true
		})
		.then(async (res) => {
			if (!unique) {
				await imageKit.purgeCache(res.url);
				res.url +=
					'?' + crypto.createHash('md5').update(Math.random().toString()).digest('hex').slice(0, 6);
			}
			return { url: res.url, name: file.name, id: res.fileId };
		});
}
export async function deleteImage(id: string) {
	return await imageKit.deleteFile(id);
}
export default imageKit;
