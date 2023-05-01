module.exports = {
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
  },

  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
  },
};
