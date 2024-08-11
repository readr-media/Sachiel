// eslint-disable-next-line @typescript-eslint/no-var-requires
const shareConfig = require('../../prettier.config')

module.exports = {
  ...shareConfig,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
}
