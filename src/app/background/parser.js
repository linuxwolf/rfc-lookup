/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function parseNumbered(base, track) {
  const re = new RegExp(`^${track}\\s*(\\d+)$`, "i");
  return (str) => {
    re.lastIndex = 0;
    const check = re.exec(str);
    if (!check) { return undefined; }

    const number = check[1];
    const content = `${base}/${track}${number}`;
    const description = `${track.toUpperCase()} ${number}`;

    return {
      content,
      description,
    };
  };
}
function parsedInternetDraft(base) {
  const re = /^draft(?:\s+|-)(.+)$/;
  return (str) => {
    re.lastIndex = 0;
    const check = re.exec(str);
    if (!check) { return undefined; }

    const doc = check[1].
      toLowerCase().
      replace(/\s+/g, "-");
    const content = `${base}/draft-${doc}`;
    const description = `I-D draft-${doc}`;

    return {
      content,
      description,
    };
  };
}

export default class Parser {
  constructor(base, defaultTrack = "rfc") {
    this.base = base;
    this.defaultTrack = defaultTrack;
    this.rules = [
      parseNumbered(base, "rfc"),
      parseNumbered(base, "std"),
      parseNumbered(base, "bcp"),
      parsedInternetDraft(base),
    ];
  }

  parse(str) {
    if (/^\d+$/.test(str)) {
      // prepend the default track
      str = `${this.defaultTrack} ${str}`;
    }

    for (let match of this.rules) {
      const r = match(str);
      if (r) {
        return r;
      }
    }

    return undefined;
  }
}
