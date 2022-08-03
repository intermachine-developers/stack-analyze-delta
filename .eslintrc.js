module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2022": true,
    "node": true
  },
  "extends": [
  ],
  "parserOptions": {
    "ecmaVersion": 13
  },
  "plugins": [
  ],
  "rules": {
    "no-var": "error",
    "no-unused-vars": "warn",
    "prefer-const": "warn",
    "eqeqeq": "warn",
    "eol-last": "error",
    "spaced-comment": "error",
    "comma-spacing": "error",
    "indent": ["error", 2, {
      "SwitchCase": 1
    }],
    "semi": "error",
  }
};
