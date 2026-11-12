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

const DIRECTORY_DATA_URL = "./data/directory.json";

export function validateDirectoryEntries(entries) {
  if (!Array.isArray(entries)) {
    throw new TypeError("Directory data must be a list.");
  }

  const ids = new Set();
  for (const entry of entries) {
    if (
      !entry ||
      typeof entry.id !== "string" ||
      typeof entry.name !== "string" ||
      typeof entry.team !== "string" ||
      typeof entry.topics !== "string" ||
      typeof entry.contact !== "string" ||
      !entry.id.trim() ||
      !entry.name.trim() ||
      !entry.team.trim() ||
      !entry.topics.trim() ||
      !entry.contact.trim() ||
      ids.has(entry.id)
    ) {
      throw new TypeError("Directory data contains an invalid profile.");
    }
    ids.add(entry.id);
  }
  return entries;
}

export function filterDirectoryEntries(notes, query = "") {
  const searchTerm = query.trim().toLowerCase();
  if (!searchTerm) {
    return notes;
  }

  return notes.filter((entry) =>
    [entry.name, entry.team, entry.topics].some((field) =>
      field.toLowerCase().includes(searchTerm),
    ),
  );
}

export function buildOptInRequest({ name, team, topics, contact }) {
  const id = globalThis.crypto?.randomUUID?.();
  if (!id) {
    throw new Error("This browser cannot create a unique profile ID.");
  }

  const candidate = {
    id: `profile-${id}`,
    name: String(name || "").trim(),
    team: String(team || "").trim(),
    topics: String(topics || "").trim(),
    contact: String(contact || "").trim(),
  };
  if (Object.values(candidate).some((field) => !field)) {
    throw new TypeError("Complete each field before preparing the request.");
  }
  return candidate;
}

function showStatus(selector, message, type = "info") {
  const target = document.querySelector(selector);
  if (target) {
    target.textContent = message;
    target.className = `status status-${type}`;
  }
}

function renderDirectory(notes, query = "") {
  const list = document.querySelector("#directory-list");
  if (!list) {
    return;
  }

  list.replaceChildren();
  const matches = filterDirectoryEntries(notes, query);
  for (const entry of matches) {
    const item = document.createElement("li");
    item.className = "directory-item";

    const title = document.createElement("strong");
    title.textContent = entry.name;

    const team = document.createElement("p");
    team.textContent = `Team: ${entry.team}`;

    const topics = document.createElement("p");
    topics.textContent = entry.topics;

    const contact = document.createElement("p");
    contact.textContent = `Contact: ${entry.contact}`;

    item.append(title, team, topics, contact);
    list.appendChild(item);
  }

  showStatus(
    "#directory-message",
    matches.length ? `${matches.length} example profile(s) shown.` : "No matching profiles.",
  );
}

async function loadDirectory() {
  const response = await fetch(DIRECTORY_DATA_URL);
  if (!response.ok) {
    throw new Error(`Directory data could not be loaded (HTTP ${response.status}).`);
  }
  return validateDirectoryEntries(await response.json());
}

function initDirectory() {
  if (typeof document === "undefined") {
    return;
  }

  let notes = [];
  const searchInput = document.querySelector("#directory-search");
  const form = document.querySelector("#opt-in-form");
  const output = document.querySelector("#request-output");

  searchInput?.addEventListener("input", () => {
    renderDirectory(notes, searchInput.value);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    try {
      const candidate = buildOptInRequest({
        name: fields.get("name"),
        team: fields.get("team"),
        topics: fields.get("topics"),
        contact: fields.get("contact"),
      });
      output.value = JSON.stringify(candidate, null, 2);
      output.hidden = false;
      document.querySelector("#request-output-label").hidden = false;
      document.querySelector("#copy-request").hidden = false;
      showStatus(
        "#form-message",
        "Request prepared on this device only. It has not been submitted or added to the directory.",
        "success",
      );
    } catch (error) {
      showStatus("#form-message", error.message, "error");
    }
  });

  document.querySelector("#copy-request")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      showStatus("#form-message", "Request JSON copied. It has not been submitted.", "success");
    } catch {
      output.focus();
      output.select();
      showStatus(
        "#form-message",
        "Automatic copy is unavailable. Select and copy the JSON above; it has not been submitted.",
        "error",
      );
    }
  });

  document.querySelectorAll(".guide-button").forEach((button) => {
    button.addEventListener("click", () => {
      renderGuideSelection(button.dataset.guide || "Business Credit");
    });
  });

  renderGuideSelection("Business Credit");
  loadDirectory()
    .then((loadedNotes) => {
      notes = loadedNotes;
      renderDirectory(notes, searchInput?.value || "");
    })
    .catch((error) => {
      showStatus("#directory-message", error.message, "error");
    });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initDirectory);
}
