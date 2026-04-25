# VoteReady India

**Your AI voting co-pilot for India - from confusion to confident vote in under 60 seconds.**

## Live Demo

- [https://project-01-4hr.pages.dev/](https://project-01-4hr.pages.dev/)

## Why This Matters

India has millions of first-time voters every cycle. Most of them face practical confusion:
- "Am I eligible right now?"
- "How do I register quickly?"
- "What exactly happens at the polling booth?"
- "What is EVM/NOTA in simple language?"

Official information exists, but it is fragmented and hard to digest for first-time users.

## What We Built

`VoteReady India` transforms election guidance into a guided conversational product.

It combines:
- deterministic civic workflow logic (Eligibility -> Registration -> Voting Day),
- personalized decisioning from user profile (age, voter ID status, state),
- actionable step-by-step responses (not generic chatbot text),
- fallback-safe AI enrichment with Google Gemini.

## Product Highlights

- **Strong onboarding:** a premium welcome panel that guides the user into the journey immediately.
- **Guided conversation:** quick reply chips and auto follow-ups reduce user friction.
- **Context-aware intelligence:** responses adapt to user age, voter ID status, and state.
- **Action-first responses:** every key answer includes clear "next best step".
- **English + Hinglish:** natural mixed-language support for accessibility.
- **Explainers for complex topics:** EVM and NOTA explained in plain, practical terms.
- **Progress tracker:** visible 3-step journey for confidence and completion.
- **Real-world links:** official Election Commission and electoral search resources included.

## How It Works (Demo Flow)

1. User lands on app and taps **Start my journey**
2. Assistant captures core profile:
   - age
   - voter ID status
   - state
3. Assistant computes current journey stage:
   - `Eligibility`
   - `Registration`
   - `Voting Day`
4. Assistant gives personalized playbook and follow-up prompts
5. User asks free-form questions (EVM, NOTA, registration, polling)
6. Assistant provides final readiness snapshot with next action

Designed so judges can see full value in a 30-60 second walkthrough.

## Google Gemini Integration

Gemini is used as an **intelligence layer**, not a replacement for workflow logic.

- **Why Gemini:** natural conversational quality + contextual understanding
- **How it is used:** for nuanced free-form election questions after baseline workflow logic
- **Safety fallback:** if API is unavailable, app still works using built-in structured responses

This architecture ensures reliability during live demos and hackathon judging.

## Tech Stack

- Vanilla HTML/CSS/JavaScript (lightweight, fast)
- Modular frontend architecture
  - UI layer: `index.html`, `styles.css`, `js/app-v2.js`
  - Assistant logic: `js/assistant-v2.js`
  - AI layer: `js/gemini-api.js`
  - Data layer: `data/*.js`

## Run Locally

1. Clone/download this repository
2. (Optional) Configure Gemini key:
   - Copy `.env.js.template` to `.env.js`
   - Add `GEMINI_API_KEY`
3. Start a static server (recommended):

```bash
python -m http.server 8000
```

4. Open [http://localhost:8000](http://localhost:8000)

You can also open `index.html` directly, but local server gives better compatibility.

## Project Size & Performance

- No heavy frameworks
- No `node_modules` committed
- Lightweight static assets
- Fast startup and smooth chat interactions
- Repository comfortably under 10 MB

## Future Scope

- Real-time integration with official election datasets/APIs
- Voter roll correction assistant flow
- Constituency-level polling booth finder
- Voice mode for accessibility
- Additional Indian language packs
- Admin analytics dashboard for civic organizations

## Disclaimer

This project is an educational civic-tech assistant. For official legal guidance, always verify with:
- [Election Commission of India](https://eci.gov.in/)
- [Electoral Search](https://electoralsearch.eci.gov.in/)
- Voter helpline: `1950`
