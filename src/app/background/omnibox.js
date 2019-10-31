/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Parser from "./parser";

const BASE_URL = "https://tools.ietf.org/html";

export default function initOmbibox() {
  const parser = new Parser(BASE_URL);
  const omnibox = browser.omnibox;
  omnibox.setDefaultSuggestion({
    description: "Lookup an RFC by number or an I-D by name",
  });

  omnibox.onInputChanged.addListener(async (text, addSuggestions) => {
    // prepare/validate text
    const results = [];
    const parsed = parser.parse(text);
    if (parsed) { results.push(parsed); }

    // TODO: matching cached results
    addSuggestions(results);
  });
  omnibox.onInputEntered.addListener((url, disposition) => {
    if (!url.startsWith(BASE_URL)) {
      // assume it needs to be parsed
      const parsed = parser.parse(url);
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
}
