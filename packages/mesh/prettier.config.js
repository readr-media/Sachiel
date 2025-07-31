// eslint-disable-next-line @typescript-eslint/no-var-requires
let shareConfig = {}
try {
  shareConfig = require('../../prettier.config')
} catch (error) {
  // Fallback configuration if shared config is not available (e.g., in Docker build)
  shareConfig = {
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  }
}

module.exports = {
  ...shareConfig,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
}
