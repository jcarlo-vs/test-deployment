const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'consistent-return': 'off',
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
      'no-shadow': 'off',
      'no-restricted-syntax': 'off',
      'no-await-in-loop': 'off',
      'no-continue': 'off',
      'no-plusplus': 'off',
      // error in using double quotes
    },
  },
];
