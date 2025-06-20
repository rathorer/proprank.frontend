/** @type {import('tailwindcss').Config} */
/** @type {@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');}; */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'proprank': ["Poppins","Sans-serif"],
			DEFAULT: ["Poppins", "Sans-serif"]
		},

		'default-letter-spacing': '0.5px',
		extend: {
			borderRadius: {
				'card': '0.25rem',
				'sm': '0.125rem'
			},
			colors: {
				'primary': '#229799',
				'primary-400': '#12F73A',
				'primary-hover': '#2EC7C9',
				'secondary-blue': '#064996',
				'secondary1': '#0A3C75',
				'secondary2': '#000417',
				current: 'currentColor',
				transparent: 'transparent',
				'light-text': '#DD9F63',
				'tags-bg': '#F8ECE0',
				'deselect-state': '#90AABC',
				'header': '#000417',
				'category-footer': '#67768C',
				'text-icon-hover': '#D0EFEF',
				'light-grey': '#5E617F',
				'default-bg': '#F9F9F9',
				'yellow': '#DD9F63',
				'darker': '#F0F0F0',
				'grey-dark': '#7E8199',
				'white': '#FFFFFF',
				'gray-dark': '#273444',
				'gray': '#8492a6',
				'gray-light': '#d3dce6',
			},
		},
	},
	plugins: [],
}
