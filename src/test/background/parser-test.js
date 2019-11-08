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

  beforeEach(() => {
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
    it("parses with leading zeros", () => {
      let result;

      result = p.parse("rfc 0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc0090`);
      expect(result).to.have.property("description").
        to.equal("RFC 0090");

      result = p.parse("RFC 0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc0090`);
      expect(result).to.have.property("description").
        to.equal("RFC 0090");

        result = p.parse("rfc0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc0090`);
      expect(result).to.have.property("description").
        to.equal("RFC 0090");

      result = p.parse("RFC0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/rfc0090`);
      expect(result).to.have.property("description").
        to.equal("RFC 0090");
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

  describe("`bcp` subsearch", () => {
    it("parses the number spaced", () => {
      let result;

      result = p.parse("bcp 8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp8192`);
      expect(result).to.have.property("description").
        to.equal("BCP 8192");

      result = p.parse("bcp    8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp8192`);
      expect(result).to.have.property("description").
        to.equal("BCP 8192");

      result = p.parse("BCP 8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp8192`);
      expect(result).to.have.property("description").
        to.equal("BCP 8192");
    });
    it("parses the number concatenated", () => {
      let result;

      result = p.parse("bcp8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp8192`);
      expect(result).to.have.property("description").
        to.equal("BCP 8192");

      result = p.parse("BCP8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp8192`);
      expect(result).to.have.property("description").
        to.equal("BCP 8192");
    });
    it("parses with leading zeros", () => {
      let result;

      result = p.parse("bcp 0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp0090`);
      expect(result).to.have.property("description").
        to.equal("BCP 0090");

      result = p.parse("BCP 0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp0090`);
      expect(result).to.have.property("description").
        to.equal("BCP 0090");

      result = p.parse("bcp0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp0090`);
      expect(result).to.have.property("description").
        to.equal("BCP 0090");

      result = p.parse("BCP0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/bcp0090`);
      expect(result).to.have.property("description").
        to.equal("BCP 0090");
    });
    it("doesn't parse non-decimal", () => {
      let result;

      result = p.parse("bcp foo");
      expect(result).to.be.undefined;

      result = p.parse("BCP FOO");
      expect(result).to.be.undefined;

      // hex numbers
      result = p.parse("bcp dead");
      expect(result).to.be.undefined;

      result = p.parse("BCP DEAD");
      expect(result).to.be.undefined;

      // numbers + letters
      result = p.parse("bcp 80ab");
      expect(result).to.be.undefined;
    });
    it("doesn't parse nothing", () => {
      let result;

      result = p.parse("bcp");
      expect(result).to.be.undefined;

      result = p.parse("bcp   ");
      expect(result).to.be.undefined;
    });
  });

  describe("`std` subsearch", () => {
    it("parses the number spaced", () => {
      let result;

      result = p.parse("std 8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std8192`);
      expect(result).to.have.property("description").
        to.equal("STD 8192");

      result = p.parse("std    8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std8192`);
      expect(result).to.have.property("description").
        to.equal("STD 8192");

      result = p.parse("STD 8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std8192`);
      expect(result).to.have.property("description").
        to.equal("STD 8192");
    });
    it("parses the number concatenated", () => {
      let result;

      result = p.parse("std8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std8192`);
      expect(result).to.have.property("description").
        to.equal("STD 8192");

      result = p.parse("STD8192");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std8192`);
      expect(result).to.have.property("description").
        to.equal("STD 8192");
    });
    it("parses with leading zeros", () => {
      let result;

      result = p.parse("std 0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std0090`);
      expect(result).to.have.property("description").
        to.equal("STD 0090");

      result = p.parse("STD 0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std0090`);
      expect(result).to.have.property("description").
        to.equal("STD 0090");

      result = p.parse("std0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std0090`);
      expect(result).to.have.property("description").
        to.equal("STD 0090");

      result = p.parse("STD0090");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/std0090`);
      expect(result).to.have.property("description").
        to.equal("STD 0090");
    });
    it("doesn't parse non-decimal", () => {
      let result;

      result = p.parse("std foo");
      expect(result).to.be.undefined;

      result = p.parse("STD FOO");
      expect(result).to.be.undefined;

      // hex numbers
      result = p.parse("std dead");
      expect(result).to.be.undefined;

      result = p.parse("STD DEAD");
      expect(result).to.be.undefined;

      // numbers + letters
      result = p.parse("std 80ab");
      expect(result).to.be.undefined;
    });
    it("doesn't parse nothing", () => {
      let result;

      result = p.parse("std");
      expect(result).to.be.undefined;

      result = p.parse("std   ");
      expect(result).to.be.undefined;
    });
  });
  describe("(internet) `draft` subsearch", () => {
    it("parses the name with hyphens", () => {
      let result;

      result = p.parse("draft-ietf-dispatch-javascript-mjs");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/draft-ietf-dispatch-javascript-mjs`);
      expect(result).to.have.property("description").
        to.equal("I-D draft-ietf-dispatch-javascript-mjs");

      result = p.parse("DRAFT-IETF-DISPATCH-JAVASCRIPT-MJS");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/draft-ietf-dispatch-javascript-mjs`);
      expect(result).to.have.property("description").
        to.equal("I-D draft-ietf-dispatch-javascript-mjs");
    });
    it("parses the name with spaces", () => {
      let result;

      result = p.parse("draft ietf dispatch javascript mjs");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/draft-ietf-dispatch-javascript-mjs`);
      expect(result).to.have.property("description").
        to.equal("I-D draft-ietf-dispatch-javascript-mjs");

      result = p.parse("DRAFT IETF DISPATCH JAVASCRIPT MJS");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/draft-ietf-dispatch-javascript-mjs`);
      expect(result).to.have.property("description").
        to.equal("I-D draft-ietf-dispatch-javascript-mjs");
    });
    it("doesn't parse nothing", () => {
      let result;

      result = p.parse("draft");
      expect(result).to.be.undefined;

      result = p.parse("draft---");
      expect(result).to.be.undefined;

      result = p.parse("draft ---");
      expect(result).to.be.undefined;
    });
  });

  describe("default track", () => {
    it("parses to the default", () => {
      let result;

      result = p.parse("8259");
      expect(result).to.not.be.undefined;
      expect(result).to.have.property("content").
        to.equal(`${BASE_URL}/${p.defaultTrack}8259`);
      expect(result).to.have.property("description").
        to.equal(`${p.defaultTrack.toUpperCase()} 8259`);
    });
  });
});
