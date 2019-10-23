/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const plugins = (process.env["LINT_STRICT"]) ?
      [] :
      [ "only-warn" ];

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
  ],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    ...plugins,
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "curly": "error",
    "dot-location": ["error", "object"],
    "no-console": "warn",
    "no-trailing-spaces": ["error", { "ignoreComments": true }],
    "spaced-comment": ["warn", "always", {
      "exceptions": ["!", "*"]
    }],
    "semi": "error",
  },
  overrides: [
    {
      files: "**/src/test/**/*.js",
      plugins: [
        "mocha",
      ],
      extends: [
        "plugin:mocha/recommended",
      ],
      env: {
        "mocha": true,
      },
      rules: {
        "mocha/no-mocha-arrows": ["off"],
        "mocha/no-setup-in-describe": ["off"],
      },
    },
  ],
};
