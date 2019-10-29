/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const BASE_URL = "https://tools.ietf.org/html";

const omnibox = browser.omnibox;
omnibox.setDefaultSuggestion({
  description: "Lookup an RFC by number or an I-D by name",
});

function checkNumbered(track) {
  const re = new RegExp(`^${track}\\s*(\\d+)$`, "i");
  return (str) => {
    re.lastIndex = 0;
    const check = re.exec(str);
    if (!check) { return undefined; }

    const number = check[1];
    const content = `${BASE_URL}/${track}${number}`;
    const description = `${track.toUpperCase()} ${number}`;

    return {
      content,
      description,
    };
  };
}
function checkDraft() {
  const re = /^draft(?:\s+|-)(.+)$/;
  return (str) => {
    re.lastIndex = 0;
    const check = re.exec(str);
    if (!check) { return undefined; }

    const doc = check[1].
        toLowerCase().
        replace(/\s+/g, "-");
    const content = `${BASE_URL}/draft-${doc}`;
    const description = `I-D draft-${doc}`;

    return {
      content,
      description,
    };
  };
}

const CHECKS = [
  checkNumbered("rfc"),
  checkNumbered("std"),
  checkNumbered("bcp"),
  checkDraft(),
];
function check(str) {
  if (/^\d+$/.test(str)) {
    // assume it's an RFC
    str = `rfc ${str}`;
  }

  for (let match of CHECKS) {
    const r = match(str);
    if (r) {
      return r;
    }
  }

  return undefined;
}

omnibox.onInputChanged.addListener(async (text, addSuggestions) => {
  // prepare/validate text
  const results = [];
  const parsed = check(text);
  if (parsed) { results.push(parsed); }

  // TODO: matching cached results
  addSuggestions(results);
});
omnibox.onInputEntered.addListener((url, disposition) => {
  if (!url.startsWith(BASE_URL)) {
    // assume it needs to be parsed
    const parsed = check(url);
    if (!parsed) { return; }
    url = parsed.content;
  }

  switch (disposition) {
    case "currentTab":
      browser.tabs.update({ url });
      break;
    case "newForegroundTab":
      browser.tabs.create({ url });
      break;
    case "newBackgroundTab":
      browser.tabs.create({ url, active: false });
      break;
  }
});
