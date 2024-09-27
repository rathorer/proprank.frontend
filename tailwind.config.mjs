/** @type {import('tailwindcss').Config} */
/** @type {import url('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap')}; */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}','./src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily:{
			'proprank': ["Public Sans"],
			DEFAULT: ["Public Sans"]
		},
		colors: {
			'primary': '#229799',
			'primary-400': '#12F73A',
			'secondary1': '#0A3C75',
			'secondary2': '#000417',
			'light-grey': '#5E617F',
			'default-bg': '#F9F9F9',
			'yellow': '#F4CE14',
			'darker':'#F0F0F0',
			'grey-dark': '#7E8199',
			'white': '#FFFFFF',
			'gray-dark': '#273444',
			'gray': '#8492a6',
			'gray-light': '#d3dce6',
		  },
		'default-letter-spacing': '0.5px',
		extend: {
			borderRadius:{
				'card': '0.25rem',
				'sm': '0.125rem'
			}
		},
	},
	plugins: [],
}
