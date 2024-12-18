

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			boxShadow: {
				'purple-glow': '#8C52FF 0px 8px 24px',
			  },
			  fontFamily: {
				italiana: ['Italiana', 'serif'],
				opensans: ['"OpenSans"', 'sans-serif'],    // Fuente OpenSans
				// Puedes añadir más fuentes aquí
			  },
		},
	},
	plugins: [],
}
