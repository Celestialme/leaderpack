import nodemailer from 'nodemailer';
import {
	SMTP_EMAIL,
	SMTP_PASSWORD,
	SMTP_PORT,
	SMTP_HOST,
	ORDER_RECEIVER
} from '$env/static/private';

const transporter = nodemailer.createTransport({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: true,

	auth: {
		user: SMTP_EMAIL,
		pass: SMTP_PASSWORD
	}
});
export async function sendMail({
	name,
	email,
	phoneNumber,
	message,
	url
}: {
	name: string;
	email: string;
	phoneNumber: string;
	message: string;
	url: string;
}) {
	let html = `
	<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <table style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
   
    <tr>
      <td style="font-size: 16px; color: #333;">
        <p><strong>Name:</strong> ${name}</p>
		${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
		${phoneNumber ? `<p><strong>Phone Number:</strong> ${phoneNumber}</p>` : ''}
        <p><strong>Product Link:</strong> ${url}</p>
		${message ? `<p><strong>Extra Information:</strong></p> <p>${message}</p>` : ''}
      </td>
    </tr>
  </table>
</body>
</html>
`;
	const options = {
		from: `Leader Pack ${SMTP_EMAIL}`,
		to: ORDER_RECEIVER,
		subject: 'Leader Pack - Order Placed',
		html: html
	};

	await transporter.sendMail(options).catch((err) => console.log(err));
}
