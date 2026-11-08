# SQE Mids Study Guide

Interactive study guide for **Software Quality Engineering** mid exams (lectures 1–5, Ms. Samreen, FUUAST).
Short notes, Urdu examples, calculators, simulators, quiz and flashcards. Plain HTML/CSS/JS, no build step.

## Structure
```
index.html          page structure and all chapter content
css/style.css       styles (light/dark theme, mobile layout, print rules)
js/core.js          helpers, navigation, collapsible topics, progress tracking, classify game
js/labs.js          interactive labs for chapters 1-5
js/quiz.js          quiz, flashcards and glossary
js/main.js          start-up
SQE-Mids-Study-Guide.pdf   printable version (notes only, no interactive tools)
```

## Features
- Bottom navigation bar on phones (Home, Learn, Quiz, Cards, Sheet), top bar on desktop
- Collapsible topic cards, practice tools open only when tapped
- Large readable text, Urdu examples in Nastaliq, dark/light mode
- Progress is saved in the browser
- Print the page (Ctrl+P) for a full notes PDF

## Run locally
Open `index.html` in a browser.

## Deploy (GitHub Pages)
Repo **Settings → Pages → Deploy from a branch → `main` / root**.
The site will be at `https://haronkhalid.github.io/SQE-MIDs/`.
