/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class Sink {
  constructor() {
    this.clearListeners();
  }

  getListeners() {
    return this._listeners;
  }
  addListener(callback) {
    this._listeners = this._listeners.concat(callback);
  }
  removeListener(listener) {
    this._listeners = this._listeners.filter(l => (l === listener));
  }
  hasListener(listener) {
    return this._listeners.includes(listener);
  }

  async trigger(...args) {
    const listeners = [...this._listeners];
    for (let l of listeners) {
      await l(...args);
    }
  }
  clearListeners() {
    this._listeners = [];
  }
}

export default Sink;
