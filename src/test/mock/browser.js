/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * @file
 * Provides a partial mock of the `browser` global property
 * in WebExtensions.
 */

import Sink from "./listener";

const omnibox = {
  setDefaultSuggestion() {},
  onInputChanged: new Sink(),
  onInputEntered: new Sink(),
};
const tabs = {
  update() {},
  create() {},
};

const browser = {
  omnibox,
  tabs,
};

Object.assign(window, {
  browser,
});
