/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { resetBrowser } from "../mock/browser";

chai.use(sinonChai);

import initOmnibox from "../../app/background/omnibox";

describe("background > omnibox", () => {
  const BASE_URL = "https://example.com/doc";
  const { omnibox } = browser;

  beforeEach(() => {
    initOmnibox(BASE_URL);
  });
  afterEach(resetBrowser);

  describe("setup", () => {
    it("registers expected listeners", () => {
      expect(omnibox.onInputChanged.getListeners()).to.have.length(1);
      expect(omnibox.onInputEntered.getListeners()).to.have.length(1);
    });
    it("registers a default SearchResult", () => {
      expect(omnibox.setDefaultSuggestion).to.have.been.calledWith({
        description: "Lookup an RFC by number or an I-D by name",
      });
    });
  });

  describe(".onInputChanged", () => {
    let addSuggestions;
    beforeEach(() => {
      addSuggestions = sinon.spy();
    });
    afterEach(() => {
      addSuggestions = undefined;
    });

    it("submits a SuggestResult for parseable text", async () => {
      await omnibox.onInputChanged.trigger("rfc 8259", addSuggestions);
      expect(addSuggestions).to.have.been.calledWith([
        { content: `${BASE_URL}/rfc8259`, description: "RFC 8259" },
      ]);

      await omnibox.onInputChanged.trigger("rfc8259", addSuggestions);
      expect(addSuggestions).to.have.been.calledWith([
        { content: `${BASE_URL}/rfc8259`, description: "RFC 8259" },
      ]);
    });
    it("submits empty results for empty text", async () => {
      await omnibox.onInputChanged.trigger("", addSuggestions);
      expect(addSuggestions).to.have.been.calledWith([]);
    });
    it("submits empty results for unparseable text", async () => {
      await omnibox.onInputChanged.trigger("something something", addSuggestions);
      expect(addSuggestions).to.have.been.calledWith([]);
    });
  });

  describe(".onInputEntered", () => {
    let spyCreateTab, spyUpdateTab;
    beforeEach(() => {
      spyCreateTab = sinon.spy(browser.tabs, "create");
      spyUpdateTab = sinon.spy(browser.tabs, "update");
    });
    afterEach(() => {
      spyCreateTab.restore();
      spyUpdateTab.restore();
    });

    it("updates the current tab with disposition='currentTab'", async () => {
      const url = `${BASE_URL}/rfc8259`;
      await omnibox.onInputEntered.trigger(url, "currentTab");
      expect(spyCreateTab).to.not.have.been.called;
      expect(spyUpdateTab).to.have.been.calledWith({
        url,
      });
    });
    it("creates a new foreground tab with disposition='newForegroundTab'", async () => {
      const url = `${BASE_URL}/rfc8259`;
      await omnibox.onInputEntered.trigger(url, "newForegroundTab");
      expect(spyUpdateTab).to.not.have.been.called;
      expect(spyCreateTab).to.have.been.calledWith({
        url,
      });
    });
    it("creates a new background tab with disposition='newBackgroundTab'", async () => {
      const url = `${BASE_URL}/rfc8259`;
      await omnibox.onInputEntered.trigger(url, "newBackgroundTab");
      expect(spyUpdateTab).to.not.have.been.called;
      expect(spyCreateTab).to.have.been.calledWith({
        url,
        active: false,
      });
    });

    describe("reparsing", () => {
      it("valid input updates current tab", async () => {
        const url = `${BASE_URL}/rfc8259`;
        await omnibox.onInputEntered.trigger("rfc 8259", "currentTab");
        expect(spyCreateTab).to.not.have.been.called;
        expect(spyUpdateTab).to.have.been.calledWith({
          url,
        });
      });
      it("valid input creates a new tab", async () => {
        const url = `${BASE_URL}/rfc8259`;
        await omnibox.onInputEntered.trigger("rfc 8259", "newForegroundTab");
        expect(spyUpdateTab).to.not.have.been.called;
        expect(spyCreateTab).to.have.been.calledWith({
          url,
        });
      });
      it("invalid input does nothing", async () => {
        await omnibox.onInputEntered.trigger("", "currentTab");
        expect(spyCreateTab).to.not.have.been.called;
        expect(spyUpdateTab).to.not.have.been.called;
      });
    });
  });
});
