/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import istanbul from "rollup-plugin-istanbul";

function onwarn(warning, log) {
  switch (warning.code) {
    case "CIRCULAR_DEPENDENCY": return;
  }
  log(warning);
}

/**
 * library bundle
 */
export const lib = {
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
/**
 * testing bundles
 */
export const test = {
  input: "src/test/index.js",
  output: {
    file: "dist/test/index.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        chai: ["expect"],
      },
    }),
    istanbul({
      exclude: [
        "src/test/**/*.js",
        "node_modules/**/*.js",
      ],
    }),
  ],
  onwarn,
};
/**
 * debugging bundles
 */
export const debug = {
  input: "src/test/index.js",
  output: {
    file: "dist/debug/index.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        chai: ["expect"],
      },
    }),
  ],
  onwarn,
};

export default [lib, debug, test];
