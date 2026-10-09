// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// ---------- Data ----------
const STORAGE_KEY = "quicknotes-notes";
let notes = loadNotes();

// ---------- Storage ----------
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

// ---------- Count message ----------
function getCountMessage() {
  if (notes.length === 0) {
    return "You have no notes yet.";
  }
  if (notes.length === 1) {
    return "You have 1 note.";
  }
  return `You have ${notes.length} notes.`;
}

// ---------- Render ----------
function render() {
  notesList.replaceChildren();
  noteCount.textContent = getCountMessage();

  const term = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(term);
  });

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No notes match your search.";
    empty.classList.add("empty-message");
    notesList.appendChild(empty);
    return;
  }

  visibleNotes.forEach(function (note) {
    const item = document.createElement("li");
    item.classList.add("note-card", `category-${note.category}`);

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.classList.add("note-meta");

    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.append(category, date, deleteButton);
    item.append(text, meta);
    notesList.appendChild(item);
  });
}

// ---------- Add ----------
function addNote(text, category) {
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(note);
  saveNotes();
  render();
}

// ---------- Delete ----------
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// ---------- Events ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

searchInput.addEventListener("input", render);

// ---------- Start ----------
render();