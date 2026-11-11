import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { buildOptInRequest, filterDirectoryEntries } from "../app.js";

const directoryFile = new URL("../data/directory.json", import.meta.url);

describe("F-01 curated directory", () => {
  it("F-01a: opening the directory has fictional curated profiles with usable fields", async () => {
    const notes = JSON.parse(await readFile(directoryFile, "utf8"));
    assert.ok(notes.length > 0);
    assert.equal(new Set(notes.map((entry) => entry.id)).size, notes.length);
    for (const note of notes) {
      assert.ok(note.name);
      assert.ok(note.team);
      assert.ok(note.topics);
      assert.match(note.contact, /@example\.invalid$/);
    }
  });

  it("F-01b: search finds profiles by name, team, or topic without case sensitivity", async () => {
    const notes = JSON.parse(await readFile(directoryFile, "utf8"));
    assert.deepEqual(filterDirectoryEntries(notes, "SAMPLE EMPLOYEE ONE").map((note) => note.id), ["sample-001"]);
    assert.deepEqual(filterDirectoryEntries(notes, "treasury").map((note) => note.id), ["sample-002"]);
    assert.deepEqual(filterDirectoryEntries(notes, "payment operations").map((note) => note.id), ["sample-002"]);
    assert.equal(filterDirectoryEntries(notes, " ").length, notes.length);
    assert.deepEqual(filterDirectoryEntries(notes, "no matching profile"), []);
  });

  it("F-01c: an opt-in form creates a trimmed request payload for manual curation", () => {
    const candidate = {
      name: "  Alex Sample ",
      team: " Treasury Management ",
      contact: " alex@example.invalid ",
      topics: "  I can discuss cash management. ",
    };

    assert.deepEqual(buildOptInRequest(candidate), {
      name: "Alex Sample",
      team: "Treasury Management",
      contact: "alex@example.invalid",
      topics: "I can discuss cash management.",
      consentToPublish: true,
    });
  });

  it("F-01d: preparing an opt-in request does not change curated directory data", async () => {
    const notes = JSON.parse(await readFile(directoryFile, "utf8"));
    const originalNotes = structuredClone(notes);

    buildOptInRequest({
      name: "Sample Employee",
      team: "Treasury Management",
      contact: "sample@example.invalid",
      topics: "Cash management",
    });

    assert.deepEqual(notes, originalNotes);
  });
});
