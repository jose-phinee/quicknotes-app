// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// ---------- Data ----------
let notes = [];

// ---------- Render ----------
function render() {
  notesList.replaceChildren();

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

// ---------- Events ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();
  addNote(text, categorySelect.value);
  noteInput.value = "";
});

render();