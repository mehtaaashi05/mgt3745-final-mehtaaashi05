import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildOptInRequest,
  filterDirectoryEntries,
  validateDirectoryEntries,
} from "../app.js";

const directoryFile = new URL("../data/directory.json", import.meta.url);

describe("F-01 curated directory", () => {
  it("F-01a: directory data loads fictional profiles with all required fields", async () => {
    const notes = validateDirectoryEntries(JSON.parse(await readFile(directoryFile, "utf8")));
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

  it("F-01c: opt-in preparation returns a trimmed local JSON profile", () => {
    const candidate = buildOptInRequest({
      name: "  Alex Sample ",
      team: " Treasury Management ",
      topics: "  Cash management. ",
      contact: " alex@example.invalid ",
    });

    assert.match(candidate.id, /^profile-[0-9a-f-]{36}$/);
    assert.deepEqual(
      { name: candidate.name, team: candidate.team, topics: candidate.topics, contact: candidate.contact },
      {
        name: "Alex Sample",
        team: "Treasury Management",
        topics: "Cash management.",
        contact: "alex@example.invalid",
      },
    );
  });

  it("F-01d: preparing a request does not change curated directory data", async () => {
    const notes = JSON.parse(await readFile(directoryFile, "utf8"));
    const originalNotes = structuredClone(notes);
    buildOptInRequest({
      name: "Sample Employee",
      team: "Treasury Management",
      topics: "Cash management",
      contact: "sample@example.invalid",
    });
    assert.deepEqual(notes, originalNotes);
  });

  it("F-01e: malformed profiles are rejected", () => {
    assert.throws(() => validateDirectoryEntries([{ id: "missing-fields" }]), /invalid profile/);
    assert.throws(() => validateDirectoryEntries({}), /must be a list/);
  });

  it("F-01f: blank request fields are rejected before creating a snippet", () => {
    assert.throws(
      () => buildOptInRequest({ name: " ", team: "", topics: "topic", contact: "a@example.invalid" }),
      /Complete each field/,
    );
  });
});
