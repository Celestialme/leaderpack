/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				Poppins: 'Poppins'
			},
			screens: {
				xs: '360px',
				sm: '567px',
				md: '900px',
				lg: '992px',
				xl: '1200px',
				'2xl': '1500px',
				'max-xs': { max: '360px' },
				'max-sm': { max: '567px' },
				'max-md': { max: '900px' },
				'max-lg': { max: '992px' },
				'max-xl': { max: '1200px' },
				'max-2xl': { max: '1500px' }
			}
		}
	},
	plugins: []
};
