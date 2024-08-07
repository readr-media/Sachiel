module.exports = {
  //TODO: ESLint: Failed to load config "../../.eslintrc" to extend from. Referenced from: /app/.eslintrc.json
  extends: [
    '../../.eslintrc',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['filename-rules', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'max-lines': ['error', { max: 500 }],
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
    'tailwindcss/no-unnecessary-arbitrary-value': 'error',
    'tailwindcss/no-custom-classname': 'error',
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
