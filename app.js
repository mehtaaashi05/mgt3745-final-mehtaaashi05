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

const DIRECTORY_DATA_URL = "./data/directory.json";
const DIRECTORY_REQUEST_FILE = "directory-opt-in-request.json";

export function getGuideCatalog() {
  return Object.fromEntries(Object.entries(guideCatalog));
}

export function getGuideArea(name) {
  return guideCatalog[name] ?? Object.values(guideCatalog)[0];
}

export function filterDirectoryEntries(entries, query = "") {
  const searchTerm = query.trim().toLowerCase();
  if (!searchTerm) {
    return entries;
  }

  return entries.filter((entry) =>
    [entry.name, entry.team, entry.topics].some((field) =>
      field.toLowerCase().includes(searchTerm),
    ),
  );
}

export function buildOptInRequest({ name, team, contact, topics }) {
  return {
    name: String(name || "").trim(),
    team: String(team || "").trim(),
    contact: String(contact || "").trim(),
    topics: String(topics || "").trim(),
    consentToPublish: true,
  };
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

function showStatus(targetSelector, message, type = "info") {
  if (typeof document === "undefined") {
    return;
  }

  const target = document.querySelector(targetSelector);
  if (!target) {
    return;
  }

  target.textContent = message;
  target.className = `status status-${type}`;
}

function renderNotes() {
  if (typeof document === "undefined") {
    return;
  }

  const list = document.querySelector("#directory-list");
  const searchInput = document.querySelector("#directory-search");
  if (!list || !searchInput) {
    return;
  }

  list.replaceChildren();
  const visibleNotes = filterDirectoryEntries(notes, searchInput.value);
  if (visibleNotes.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = notes.length
      ? "No profiles match that search."
      : "There are no curated profiles yet.";
    list.appendChild(emptyState);
    return;
  }

  visibleNotes.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "directory-item";

    const details = document.createElement("div");
    details.className = "directory-summary";

    const title = document.createElement("strong");
    title.textContent = entry.name;

    const team = document.createElement("p");
    team.textContent = `Team: ${entry.team}`;

    const topics = document.createElement("p");
    topics.textContent = entry.topics;

    const contact = document.createElement("p");
    contact.textContent = `Contact: ${entry.contact}`;

    details.append(title, team, topics, contact);
    item.appendChild(details);
    list.appendChild(item);
  });
}

async function loadNotes() {
  try {
    const response = await fetch(DIRECTORY_DATA_URL);
    if (!response.ok) {
      showStatus("#directory-message", "The curated directory could not be loaded. Please try again later.", "error");
      return;
    }

    const directoryEntries = await response.json();
    const validEntries =
      Array.isArray(directoryEntries) &&
      directoryEntries.every(
        (entry) =>
          entry &&
          ["id", "name", "team", "topics", "contact"].every(
            (field) => typeof entry[field] === "string" && entry[field].trim(),
          ),
      );

    if (!validEntries) {
      showStatus("#directory-message", "The curated directory data is invalid. Please contact its maintainer.", "error");
      return;
    }

    notes = directoryEntries;
    renderNotes();
  } catch {
    showStatus("#directory-message", "The curated directory could not be loaded. Please try again later.", "error");
  }
}

function downloadOptInRequest(request) {
  const file = new Blob([`${JSON.stringify(request, null, 2)}\n`], {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = DIRECTORY_REQUEST_FILE;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    link.remove();
    URL.revokeObjectURL(url);
  }, 1000);
}

let notes = [];
let candidate = null;

function initDirectory() {
  if (typeof document === "undefined") {
    return;
  }

  const searchInput = document.querySelector("#directory-search");
  if (searchInput) {
    searchInput.addEventListener("input", renderNotes);
  }

  const optInForm = document.querySelector("#opt-in-form");
  if (optInForm) {
    optInForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(optInForm);
      candidate = {
        name: String(formData.get("name") || ""),
        team: String(formData.get("team") || ""),
        contact: String(formData.get("contact") || ""),
        topics: String(formData.get("topics") || ""),
      };

      if (!formData.get("consent") || Object.values(candidate).some((value) => !value.trim())) {
        showStatus("#form-message", "Complete every field and confirm consent before preparing the request.", "error");
        return;
      }

      const request = buildOptInRequest(candidate);
      const requestOutput = document.querySelector("#request-output");
      const requestOutputLabel = document.querySelector("#request-output-label");
      if (requestOutput && requestOutputLabel) {
        requestOutput.value = JSON.stringify(request, null, 2);
        requestOutput.hidden = false;
        requestOutputLabel.hidden = false;
      }

      try {
        downloadOptInRequest(request);
        showStatus(
          "#form-message",
          "Request prepared locally. It has not been sent or added to the directory; share the downloaded file or copied JSON with the maintainer through an approved private channel.",
          "success",
        );
        optInForm.reset();
        candidate = null;
      } catch {
        showStatus(
          "#form-message",
          "The request is shown below, but the file could not be created. Copy the JSON and share it with the maintainer through an approved private channel.",
          "error",
        );
      }
    });
  }

  document.querySelectorAll(".guide-button").forEach((button) => {
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
