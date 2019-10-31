/*!
 * Copyright (c) 2019 Matthew A. Miller
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { expect } from "chai";

import Parser from "../../app/background/parser";

describe("background > parser", () => {
  const BASE_URL = "https://rfc-editor.example/html";
  let p;

  before(() => {
    p = new Parser(BASE_URL);
  });

  it("has expected properties", () => {
    expect(p).to.have.property("base").to.equal(BASE_URL);
    expect(p).to.have.property("defaultTrack").to.equal("rfc");
  });

  it("doesn't parse nothing", () => {
    let result;

    result = p.parse("");
    expect(result).to.be.undefined;

    result = p.parse("  ");
    expect(result).to.be.undefined;

    result = p.parse(null);
    expect(result).to.be.undefined;

    result = p.parse();
    expect(result).to.be.undefined;
  });

  describe("`rfc` subsearch", () => {
    it("parses the number spaced", () => {
      let result;

      result = p.parse("rfc 8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc8192`);
      expect(result).to.have.property("description").
        to.equal("RFC 8192");

      result = p.parse("rfc    8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc8192`);
      expect(result).to.have.property("description").
        to.equal("RFC 8192");

        result = p.parse("RFC 8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc8192`);
      expect(result).to.have.property("description").
        to.equal("RFC 8192");
    });
    it("parses the number concatenated", () => {
      let result;

      result = p.parse("rfc8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc8192`);
      expect(result).to.have.property("description").
        to.equal("RFC 8192");

      result = p.parse("RFC8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc8192`);
      expect(result).to.have.property("description").
        to.equal("RFC 8192");
    });
    it("doesn't parse non-decimal", () => {
      let result;

      result = p.parse("rfc foo");
      expect(result).to.be.undefined;

      result = p.parse("RFC FOO");
      expect(result).to.be.undefined;

      // hex numbers
      result = p.parse("rfc dead");
      expect(result).to.be.undefined;

      result = p.parse("RFC DEAD");
      expect(result).to.be.undefined;

      // numbers + letters
      result = p.parse("rfc 80ab");
      expect(result).to.be.undefined;
    });
    it("doesn't parse nothing", () => {
      let result;

      result = p.parse("rfc");
      expect(result).to.be.undefined;

      result = p.parse("rfc   ");
      expect(result).to.be.undefined;
    });
  });
});
