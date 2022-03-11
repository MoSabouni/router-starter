// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'warn',
    'no-restricted-syntax': [
      'error',
      {
        selector: "MemberExpression[property.name='innerHTML']",
        message: 'Do not use `.innerHTML`. Use `createElement()` instead.',
      },
    ],
  },
};
