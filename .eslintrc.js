module.exports = {
  // ref: https://nextjs.org/docs/basic-features/eslint#rootdir
  settings: {
    next: {
      rootDir: 'packages/*/',
    },
  },
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
