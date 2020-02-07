module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'prettier'],
  rules: {
    indent: 'off',
    global: 'off',
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': 0,
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'react/prop-types': 0,
    'react/forbid-component-props': 0,
    'prettier/prettier': ['error'],
  },
  settings: {
    react: {
      version: require('./package.json').dependencies.react,
    },
  },
}
