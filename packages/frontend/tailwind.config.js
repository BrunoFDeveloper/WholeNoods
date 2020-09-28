const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	experimental: 'all',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: [],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				'almost-black': '#121212',
			},
			boxShadow: {
				white: '4px 4px 8px rgba(255, 255, 225, 0.05)',
			},
			inset: {
				6: '1.5rem',
			},
		},
	},
	variants: {
		padding: ['responsive', 'first'],
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/ui')],
};
