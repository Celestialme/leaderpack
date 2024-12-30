/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				Poppins: 'Poppins'
			},
			screens: {
				xs: '361px',
				sm: '568px',
				md: '901px',
				lg: '1001px',
				xl: '1201px',
				'2xl': '1501px',
				'max-xs': { max: '360px' },
				'max-sm': { max: '567px' },
				'max-md': { max: '900px' },
				'max-lg': { max: '1000px' },
				'max-xl': { max: '1200px' },
				'max-2xl': { max: '1500px' }
			}
		}
	},
	plugins: []
};
