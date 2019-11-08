/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Parser from "./parser";

const BASE_URL = "https://tools.ietf.org/html";

export default function initOmnibox(base = BASE_URL) {
  const parser = new Parser(base);
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
  omnibox.onInputEntered.addListener(async (url, disposition) => {
    const tabs = browser.tabs;
    if (!url.startsWith(parser.base)) {
      // assume it needs to be parsed
      const parsed = parser.parse(url);
      if (!parsed) { return; }
      url = parsed.content;
    }

    switch (disposition) {
      case "currentTab":
        tabs.update({ url });
        break;
      case "newForegroundTab":
        tabs.create({ url });
        break;
      case "newBackgroundTab":
        tabs.create({ url, active: false });
        break;
    }
  });
}
