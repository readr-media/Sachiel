const shareConfig = require('../../prettier.config')

module.exports = {
  ...shareConfig,
  // @ts-ignore: no definition
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
}
