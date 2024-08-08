module.exports = {
  '*.{js,jsx}': 'eslint --cache --fix',
  '*.{ts,tsx}': ['eslint --cache --fix', () => 'tsc -p tsconfig.json --noEmit'],
}
