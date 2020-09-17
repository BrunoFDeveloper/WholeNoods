module.exports = {
  experimental: "all",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/ui")],
};
