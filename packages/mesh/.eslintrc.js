module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['filename-rules', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // 'max-lines': ['error', { max: 500 }],
    'filename-rules/match': [2, 'kebab-case'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
    'tailwindcss/no-custom-classname': 'off',
    'prettier/prettier': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@next/next/no-html-link-for-pages': 'off',
  },
  overrides: [
    {
      files: ['.eslintrc.js'],
      rules: {
        'filename-rules/match': 'off',
      },
    },
  ],
}
