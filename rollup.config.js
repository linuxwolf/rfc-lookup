/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

/**
 * library bundle
 */
export default {
  input: {
    "background": "src/app/background/index.js",
  },
  output: {
    dir: "dist/app",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
  ],
};
