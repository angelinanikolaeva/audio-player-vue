module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  ignorePatterns: ['.eslintrc.js', 'vite.config.ts'],
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    camelcase: 'off',
    'no-duplicate-imports': 'off',
    // import
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    // typescript
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    // VUE
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/require-default-prop': 'off',
  },
};
