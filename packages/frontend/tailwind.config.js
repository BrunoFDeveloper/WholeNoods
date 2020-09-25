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
		},
	},
	variants: {},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/ui')],
};
