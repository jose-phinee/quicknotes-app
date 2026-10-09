# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, put each one in a category (Personal, Work or Study), search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add notes with a category: Personal, Work or Study
- Each note shows its text, category label, date and time, and a Delete button
- Delete any note
- Search notes as you type (not case-sensitive)
- Validation: empty notes and notes over 200 characters show an error message
- Correct note count for zero, one and many notes
- Notes saved in localStorage so they survive a page refresh
- Colour-coded note cards for each category
- Responsive layout that stacks the form on small screens

## How to run locally

1. Clone the repository:
   ```
   git clone https://github.com/jose-phinee/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder.
3. Open `index.html` in your browser (double-click it, or right-click and choose Open with Chrome).

No installation or build step is needed.

## What I have learnt while creating quicknotes-app

- How to build a page from semantic HTML tags and link each label to its input.
- How to lay out a form with Flexbox and use a media query to change the layout on small screens.
- How to store an array of objects, rebuild the page from it with `createElement` and `textContent`, and why `innerHTML` should not be used for user text. i now understand the concept since i have done it practically.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to make small commits as I finish each part of a project.