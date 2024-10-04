module.exports = {
  // ref: https://nextjs.org/docs/basic-features/eslint#rootdir
  settings: {
    next: {
      rootDir: 'packages/*/',
    },
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-unused-vars': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
