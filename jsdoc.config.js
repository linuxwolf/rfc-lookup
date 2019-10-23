/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* eslint-env node */

module.exports = {
  plugins: [
    "plugins/markdown",
  ],
  sourceType: "module",
  source: {
    include: "./src/lib",
  },
  opts: {
    destination: "docs/api",
    encoding: "utf8",
    package: "./package.json",
    readme: "./README.md",
    recurse: true,
    template: "./node_modules/ink-docstrap/template",
  },
  templates: {
    disablePackagePath: true,
  },
};
