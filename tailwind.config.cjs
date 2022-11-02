/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				introbg: "url('/chat.png')",
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
