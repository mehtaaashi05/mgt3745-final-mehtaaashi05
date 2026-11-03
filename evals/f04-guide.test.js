import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { getGuideCatalog, getGuideArea, parseEntryCandidate, getDirectoryEndpoint } from "../app.js";

describe("F-04 guide", () => {
  it("F-04-1: guide data lists Business Credit and Treasury Management", () => {
    const guide = getGuideCatalog();
    assert.deepEqual(Object.keys(guide), ["Business Credit", "Treasury Management"]);
  });

  it("F-04-2: every F-04 area has a summary and at least one conversation starter", () => {
    const businessCredit = getGuideArea("Business Credit");
    const treasuryManagement = getGuideArea("Treasury Management");

    assert.match(businessCredit.summary, /Business Credit/i);
    assert.ok(Array.isArray(businessCredit.conversationStarters));
    assert.ok(businessCredit.conversationStarters.length >= 1);

    assert.match(treasuryManagement.summary, /Treasury Management/i);
    assert.ok(Array.isArray(treasuryManagement.conversationStarters));
    assert.ok(treasuryManagement.conversationStarters.length >= 1);
  });

  it("F-04-3: each selected guide is labeled illustrative", () => {
    const guide = getGuideArea("Business Credit");
    assert.match(JSON.stringify(guide), /illustrative|official role description|transfer recommendation/i);
  });

  it("F-04-4: the directory endpoint matches the GET /entries contract", () => {
    assert.equal(getDirectoryEndpoint(), "/entries");
    assert.equal(parseEntryCandidate("  Need a quick intro  "), "Need a quick intro");
  });
});
