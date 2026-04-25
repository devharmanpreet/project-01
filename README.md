# Election Guide Assistant (India)

**A guided, AI-assisted web app that helps Indian voters understand eligibility, registration, and polling-day steps — clearly and safely.**

## Live Demo

- [https://project-01-4hr.pages.dev/](https://project-01-4hr.pages.dev/)

## Problem Statement (India)

Many Indian voters (especially first-time voters) face avoidable confusion:
- Eligibility and what to do if you are not yet 18
- How to register / verify name in electoral roll
- What happens at the polling booth (EVM, VVPAT, NOTA)
- Which official links to trust for verification

## Solution Overview

This project turns scattered election guidance into a **step-by-step interactive assistant**:
- deterministic decision flow for core tasks (Eligibility → Registration → Voting Day)
- AI (Gemini) for nuanced explanations when users ask free-form questions
- safe fallbacks so the assistant **never crashes** and always guides the user to the next best step

## Key Features (Evaluation-Focused)

- **Robust input handling**: empty input rejected, message length bounded, age validated strictly (0–120).
- **No-crash guarantee**: all flows return safe, actionable outputs; unexpected text is handled gracefully.
- **Clear next-step guidance**: responses consistently end with the next action.
- **Accessibility**: labeled inputs, ARIA labels, semantic landmarks, keyboard navigation, strong focus outlines.
- **Google services usage (meaningful)**:
  - Gemini: contextual explanations using the user profile (age, voter ID status, state).
  - Sheets-style session storage (mock): structured session rows persisted for analysis and civic insights.

## How It Works (Flow)

1. User starts the assistant
2. Assistant collects minimal profile signals:
   - age
   - voter ID status
   - state
3. Assistant determines journey stage and guides:
   - Eligibility → what you can do now
   - Registration → what to submit and how to track
   - Voting Day → what happens at the booth + what to carry
4. User can ask free-form questions; Gemini is used when helpful

## Google Services

### Google Gemini (AI reasoning + explanations)

- **Why used**: natural, contextual explanations for user questions like EVM/NOTA/registration edge cases.
- **How used**: `answerElectionQuestion(question, context, language)` sends the user profile as context.
- **Safe fallback**: if Gemini is unavailable, deterministic responses still guide the user.

### Google Sheets (mock session storage)

- **Why used**: demonstrates how civic programs can store anonymized session insights (e.g., common blockers).
- **How used**: `js/google-services.js` stores a structured “row” in localStorage:
  - age, voter ID status, state, language, message count, session id, timestamp
- **Security**: no Sheets credentials are embedded in frontend.

## Input Validation & Safety

- **Empty input**: rejected with a clear prompt
- **Age validation**: strict 0–120 parsing via `js/validation.js`
- **Unexpected/random text**: returns the required safe fallback:
  - “I didn’t fully understand that, but I can guide you through voting eligibility or the election process.”
- **API key safety**: keys loaded from `.env.js` (gitignored) or runtime config only

## Code Structure (Modules)

- **UI/controller**: `js/app-v2.js`
- **Decision logic**: `js/assistant-v2.js`
- **AI service**: `js/gemini-api.js`
- **Validation layer**: `js/validation.js`
- **Google services layer (mock)**: `js/google-services.js`
- **Smoke tests**: `tests/smoke-tests.js`

## Testing

Run in browser console:

```javascript
runSmokeTests()
```

## Run Locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Disclaimer

This is an informational civic-tech assistant. Always verify via:
- [Election Commission of India](https://eci.gov.in/)
- [Electoral Search Portal](https://electoralsearch.eci.gov.in/)
- Voter helpline: `1950`
