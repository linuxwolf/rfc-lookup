/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const rollupPreprocessor = {
  plugins: [
    require("rollup-plugin-node-resolve")(),
    require("rollup-plugin-commonjs")({
      namedExports: {
        chai: ["expect"],
      },
    }),
    require("rollup-plugin-istanbul")({
      exclude: [
        "src/test/**/*.js",
        "node_modules/**/*.js",
      ],
    }),
  ],
  output: {
    format: "iife",
    name: "rfcLookup",
    sourceMap: "inline",
  },
  onwarn(warning, log) {
    switch (warning.code) {
      case "CIRCULAR_DEPENDENCY": return;
    }
    log(warning);
  },
};

module.exports = (config) => {
  config.set({
    basePath: ".",
    browsers: ["FirefoxHeadless"],
    frameworks: ["mocha"],
    reporters: ["mocha", "junit", "coverage"],
    files: [ "src/test/index.js" ],
    coverageReporter: {
      dir: "./dist/coverage",
      reporters: [
        { type: "lcovonly", subdir: "." },
        { type: "html", subdir: "." },
        { type: "text" },
      ],
    },
    junitReporter: {
      outputDir: "./dist/test/mocha",
      outputFile: "results.xml",
      useBrowserName: false,
    },
    rollupPreprocessor,

    preprocessors: {
      "src/**/*.js": [ "rollup" ],
    },
  });
};
