# SQE Mids Study Guide

Interactive study guide for **Software Quality Engineering** mid exams (lectures 1–5, Ms. Samreen, FUUAST).
Short notes, Urdu examples, calculators, simulators, quiz and flashcards. Plain HTML/CSS/JS, no build step.

## Structure
```
index.html          page structure and all chapter content
css/style.css       styles (light/dark theme, mobile layout, print rules)
js/core.js          helpers, navigation, collapsible topics, topic progress, classify game
js/progress.js      scenario attempts, quiz history (browser localStorage)
js/scenario-data.js scenario content only (add new scenarios here)
js/scenarios.js     Scenarios page: filters, guided mode, exam mode, feedback
js/quiz-modes.js    quiz modes: quick, scenario, mixed, chapter, mock exam
js/labs.js          interactive labs for chapters 1-5
js/quiz.js          concept questions, flashcards and glossary
js/main.js          start-up
SQE-Mids-Study-Guide.pdf   printable version (notes only, no interactive tools)
```

## Features
- **Scenarios tab:** 27 case-based scenarios (all 5 chapters, 6 categories, 3 difficulty levels) with search and filters
- **Guided practice** (5 thinking stages with hints) and **Exam mode** (timer, solutions hidden until submit)
- **Quiz modes:** Quick, Scenario, Mixed, Chapter Practice and a 30-question Mock Exam, with chapter-wise results and weak-topic links
- Each lesson links to related scenarios and has a short "Where would you use this?" note
- Bottom navigation bar on phones (Home, Learn, Quiz, Cards, Sheet), top bar on desktop
- Collapsible topic cards, practice tools open only when tapped
- Large readable text, Urdu examples in Nastaliq, dark/light mode
- Progress is saved in this browser only (does not sync across devices); the Reset button on Home clears it
- Print the page (Ctrl+P) for a full notes PDF

## Run locally
Open `index.html` in a browser.

## Deploy (GitHub Pages)
Repo **Settings → Pages → Deploy from a branch → `main` / root**.
The site will be at `https://haronkhalid.github.io/SQE-MIDs/`.

## Adding scenarios
Edit `js/scenario-data.js`. Each scenario is a plain object (title, chapter, category, difficulty, description, questions, hints, solution, related lessons). Question types: `single`, `multi`, `match`, `written`. Check terminology against the lecture slides before setting `published`.

## Note on security
This is a static site. Answers are in the page source, so exam mode is for practice and is not a secure examination.
