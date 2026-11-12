import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { parseEntryCandidate, getDirectoryEndpoint } from "../app.js";

describe("F-01 directory", () => {
  it("F-01a: a valid candidate is trimmed and routed to the directory API", () => {
    const candidate = parseEntryCandidate("  I can share a quick intro to the team.  ");
    assert.equal(candidate, "I can share a quick intro to the team.");
    assert.equal(getDirectoryEndpoint(), "/entries");
  });

  it("F-01b: a blank candidate is rejected before saving", () => {
    const candidate = parseEntryCandidate("   ");
    assert.equal(candidate, "");
    assert.equal(getDirectoryEndpoint(), "/entries");
  });
});
