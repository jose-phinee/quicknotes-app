// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// ---------- Data ----------
let notes = [];

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

  notes.forEach(function (note) {
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
  render();
}

// ---------- Delete ----------
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
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

render();