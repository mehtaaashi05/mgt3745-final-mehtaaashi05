export const guideCatalog = Object.freeze({
  "Business Credit": {
    summary:
      "Illustrative summary: Business Credit reviews credit requests, monitors exposure, and partners with relationship teams to understand risk before a decision is made. This is not an official role description or transfer recommendation.",
    conversationStarters: [
      "What does a first-year analyst in Business Credit actually track day to day?",
      "How do you decide whether an account needs more review or a simpler structure?",
    ],
  },
  "Treasury Management": {
    summary:
      "Illustrative summary: Treasury Management helps clients manage cash, liquidity, and market risk while coordinating the day-to-day operations behind funding and payments. This is not an official role description or transfer recommendation.",
    conversationStarters: [
      "What kinds of decisions are you helping clients make during a typical week?",
      "How does Treasury Management balance client service with market and operational risk?",
    ],
  },
});

export function getGuideCatalog() {
  return Object.fromEntries(Object.entries(guideCatalog));
}

export function getGuideArea(name) {
  return guideCatalog[name] ?? Object.values(guideCatalog)[0];
}

export function renderGuideSelection(selectedName = "Business Credit") {
  if (typeof document === "undefined") {
    return getGuideArea(selectedName);
  }

  const selectedGuide = getGuideArea(selectedName);
  const target = document.querySelector("#guide-content");
  if (!target) {
    return selectedGuide;
  }

  target.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = selectedName;

  const label = document.createElement("p");
  label.className = "guide-label";
  label.textContent = "Illustrative summary: not an official role description or transfer recommendation.";

  const summary = document.createElement("p");
  summary.textContent = selectedGuide.summary;

  const list = document.createElement("ul");
  list.className = "conversation-starters";
  selectedGuide.conversationStarters.forEach((starter) => {
    const item = document.createElement("li");
    item.textContent = starter;
    list.appendChild(item);
  });

  target.append(heading, label, summary, list);

  document.querySelectorAll(".guide-button").forEach((button) => {
    const isActive = button.dataset.guide === selectedName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  return selectedGuide;
}

const DIRECTORY_STORAGE_KEY = "team-directory-entries";
const DIRECTORY_ENDPOINT =
  (typeof window !== "undefined" && window.API_URL) || "/entries";

function readFallbackNotes() {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(DIRECTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFallbackNotes(nextNotes) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(DIRECTORY_STORAGE_KEY, JSON.stringify(nextNotes));
}

export function getDirectoryEndpoint() {
  return DIRECTORY_ENDPOINT;
}

export function parseEntryCandidate(rawValue) {
  return typeof rawValue === "string" ? rawValue.trim() : "";
}

function showStatus(message, type = "info") {
  if (typeof document === "undefined") {
    return;
  }

  const target = document.querySelector("#form-message");
  if (!target) {
    return;
  }

  target.textContent = message;
  target.className = `status status-${type}`;
}

async function loadNotes() {
  if (typeof document === "undefined") {
    return [];
  }

  try {
    const response = await fetch(DIRECTORY_ENDPOINT, { method: "GET" });
    if (!response.ok) {
      throw new Error("Directory request failed");
    }

    const entries = await response.json();
    notes = Array.isArray(entries) ? entries : [];
    renderNotes();
    return notes;
  } catch {
    notes = readFallbackNotes();
    renderNotes();
    return notes;
  }
}

async function createEntry(rawCandidate) {
  const candidate = parseEntryCandidate(rawCandidate);
  if (!candidate) {
    showStatus("Please add a short description before saving.", "error");
    return;
  }

  const draft = {
    id: `entry-${Date.now()}`,
    text: candidate,
    createdAt: new Date().toISOString(),
  };

  nextNotes = [...notes, draft];

  try {
    const response = await fetch(DIRECTORY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: candidate }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(errorBody.error || "Request failed");
    }

    const savedEntry = await response.json();
    notes = Array.isArray(savedEntry) ? savedEntry : [...notes, savedEntry];
    writeFallbackNotes(notes);
    renderNotes();
    showStatus("Entry saved. A new conversation request is now visible.", "success");
    return notes;
  } catch (error) {
    notes = nextNotes;
    writeFallbackNotes(notes);
    renderNotes();
    showStatus(error instanceof Error ? error.message : "Unable to save the entry right now.", "error");
    return notes;
  }
}

async function deleteEntry(entryId) {
  const targetId = String(entryId);
  const selected = notes.find((entry) => String(entry.id) === targetId);
  if (!selected) {
    return notes;
  }

  nextNotes = notes.filter((entry) => String(entry.id) !== targetId);

  try {
    const response = await fetch(`${DIRECTORY_ENDPOINT}/${encodeURIComponent(targetId)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete request failed");
    }

    notes = nextNotes;
    writeFallbackNotes(notes);
    renderNotes();
    showStatus("Entry removed from the directory.", "success");
    return notes;
  } catch {
    renderNotes();
    showStatus("A save error prevented the opt-out update. The entry remains visible.", "error");
    return notes;
  }
}

function renderNotes() {
  if (typeof document === "undefined") {
    return;
  }

  const list = document.querySelector("#directory-list");
  if (!list) {
    return;
  }

  list.replaceChildren();

  notes.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "directory-item";

    const details = document.createElement("div");
    details.className = "directory-summary";

    const title = document.createElement("strong");
    title.textContent = entry.name || "Available employee";

    const description = document.createElement("p");
    description.textContent = entry.text || "Available for a short informal conversation.";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      deleteEntry(entry.id);
    });

    details.append(title, description);
    item.append(details, removeButton);
    list.appendChild(item);
  });
}

let notes = [];
let candidate = "";
let nextNotes = [];

function initDirectory() {
  if (typeof document === "undefined") {
    return;
  }

  const form = document.querySelector("#directory-form");
  const input = document.querySelector("#directory-input");

  if (form && input) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      candidate = input.value;
      await createEntry(candidate);
      input.value = "";
    });
  }

  const guideButtons = document.querySelectorAll(".guide-button");
  guideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderGuideSelection(button.dataset.guide || "Business Credit");
    });
  });

  renderGuideSelection("Business Credit");
  loadNotes();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initDirectory);
}
