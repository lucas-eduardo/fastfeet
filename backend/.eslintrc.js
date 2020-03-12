module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'prettier/@typescript-eslint',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
  ],
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
      }
    ]
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".ts"]
      }
    }
  }
};
