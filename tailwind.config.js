/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter'],
				roboto: ['Roboto']
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
