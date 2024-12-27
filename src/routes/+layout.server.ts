import '@src/db';
import { getData } from '@src/db';
console.log('run db');

export async function load() {
	let resp = await getData();
	return { ...resp };
}
