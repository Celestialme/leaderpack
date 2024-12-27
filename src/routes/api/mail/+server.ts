import { sendMail } from './mail.js';

export async function POST({ request }) {
	let data = await request.formData();
	let name = data.get('name') as string;
	let phoneNumber = data.get('phoneNumber') as string;
	let email = data.get('email') as string;
	let message = data.get('message') as string;
	let url = data.get('url') as string;

	await sendMail({
		email,
		message,
		name,
		phoneNumber,
		url
	});
	return new Response();
}
