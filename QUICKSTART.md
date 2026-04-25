# 🚀 Quick Start Guide - Election Guide Assistant

Get the Election Guide Assistant up and running in less than 5 minutes!

---

## **Option 1: Just Open in Browser (Easiest - No Setup!)**

1. **Download or clone this project**
   ```bash
   git clone <repository-url>
   cd election-guide-assistant
   ```

2. **Open `index.html` in your browser**
   - Double-click `index.html` 
   - Or drag it into your browser
   - The app opens immediately!

3. **Without API** (Uses built-in responses)
   - Chat works offline
   - All basic features available
   - "Am I ready?" checklist works
   - Timeline and state info visible

---

## **Option 2: With Google Gemini API (For AI Responses)**

This enables the assistant to answer ANY election question intelligently!

### Step 1: Get API Key

1. Visit: **https://ai.google.dev/**
2. Click **"Get API Key"**
3. Sign in with Google account (or create one)
4. Create new project or select existing one
5. Enable **"Generative AI API"**
6. **Copy your API key** from the API keys page
7. DO NOT share this key publicly!

### Step 2: Configure API Key

**Option A: Using .env.js (Recommended - Easy & Secure)**

1. Copy `.env.js.template` → `.env.js`
   ```bash
   # On Mac/Linux:
   cp .env.js.template .env.js
   
   # On Windows:
   copy .env.js.template .env.js
   ```

2. Open `.env.js` in your text editor

3. Replace `'your_api_key_here'` with your actual API key:
   ```javascript
   const ENV = {
       GEMINI_API_KEY: 'paste-your-key-here',
       // ... rest remains same
   };
   ```

4. Save file

5. **Important:** `.env.js` is in `.gitignore` - it won't be committed to git ✅

**Option B: In the browser (For quick testing)**
- Open Developer Tools (F12)
- Go to Console tab
- Type: `setGeminiApiKey('your-api-key')`
- It saves to browser storage for that session

**Option C: In the code (Not recommended - security risk!)**
- Open `config.js`
- Set `GEMINI_API_KEY: 'your-key'`
- Note: Don't commit files with API keys!

### Step 3: Verify Setup

Check if API is configured correctly:

**In Browser Console (F12):**
```javascript
// Optional checks (no logging required)
CONFIG
isApiConfigured()
testGeminiApi()
```

**Expected output:**
```
✅ Gemini API is configured and working
```

**Using Python 3:**
```bash
python -m http.server 8000
# Open: http://localhost:8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
# Open: http://localhost:8000
```

**Using Node.js (if installed):**
```bash
# First install http-server globally
npm install -g http-server

# Then run
http-server
# Open: http://localhost:8080
```

**Using PHP:**
```bash
php -S localhost:8000
# Open: http://localhost:8000
```

---

## **Option 3: Deploy Online**

### Deploy to Netlify (FREE & Easy)

1. **Create account at https://netlify.com**
2. **Drag and drop project folder into Netlify**
3. **Site is live in seconds!**
4. Your site gets a URL: `https://your-site-name.netlify.app`

**⚠️ Important:** For security, set environment variables in Netlify:
- Site settings → Environment → Add variable
- Key: `GEMINI_API_KEY`
- Value: Your API key

### Deploy to GitHub Pages (FREE)

1. **Create repository on GitHub**
2. **Push all files to `main` branch**
3. **Go to Settings → Pages**
4. **Select `main` branch as source**
5. **Site published automatically!**

**URL will be:** `https://your-username.github.io/election-guide-assistant`

### Deploy to Vercel

1. **Sign up at https://vercel.com**
2. **Connect your GitHub repository**
3. **Vercel auto-deploys on every push!**
4. Set environment variables in Vercel dashboard

---

## **Project Structure**

```
election-guide-assistant/
├── index.html              ← Open this in browser!
├── styles.css              ← All styling
├── README.md               ← Full documentation  
├── .gitignore              ← Git configuration
│
├── js/
│   ├── app.js              ← Main app controller
│   ├── assistant.js        ← Conversation logic
│   ├── gemini-api.js       ← AI integration
│   └── utils.js            ← Helper functions
│
└── data/
    ├── states.js           ← 28 states + 8 UTs info
    ├── election-data.js    ← Election facts & timeline
    └── responses.js        ← Pre-built responses
```

---

## **Features Overview**

✅ **Conversational Chat Interface**
- Ask anything about voting in India
- Natural conversation flow
- Real-time responses

✅ **Smart Decision Logic**
- Age eligibility check
- Voter ID guidance
- State-specific information
- First-time voter support

✅ **Interactive Workflows**
- "Am I ready to vote?" checklist
- Progress tracker
- Election timeline
- Polling station info

✅ **Multi-language**
- English ✓
- Hindi (toggle) ✓
- Easy to add more languages

✅ **Google Integration**
- Gemini API for smart Q&A
- Ready for Google Sheets integration
- Mock data structure included

---

## **Testing the App**

### Without API (Offline Mode)
1. Open `index.html`
2. Try these:
   - **Ask:** "What is NOTA?"
   - **Ask:** "How does EVM work?"
   - **Click:** "Am I ready?" button
   - **Toggle:** Language to Hindi

### With API (Online Mode)
1. Set API key in `js/gemini-api.js`
2. Open `index.html`
3. Try:
   - "What is a Voter ID?"
   - "How do I register to vote?"
   - "Can I vote if I'm 17?"
   - Any election-related question!

---

## **Troubleshooting**

### Issue: "API not configured" message
**Solution:**
- Set your API key in `js/gemini-api.js`
- Or add it as environment variable
- Or just use built-in responses (works anyway!)

### Issue: Chat not responding
**Solution:**
- Check browser console (Ctrl+Shift+J)
- Ensure internet connection
- Try local server instead of direct file
- Reload page

### Issue: Styling looks broken
**Solution:**
- Ensure `styles.css` is in same folder as `index.html`
- Check file paths are correct
- Try different browser (Chrome/Firefox)
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: State dropdown empty
**Solution:**
- Ensure `data/states.js` loaded
- Check browser console for errors
- Try refreshing page

---

## **Customization**

### Add More States
Edit `data/states.js`:
```javascript
{
    code: 'XX',
    name: 'Your State Name',
    email: 'email@eci.gov.in',
    phone: '+91-xxx-xxxx',
    website: 'https://...',
    registrationLink: 'https://electoralsearch.eci.gov.in/'
}
```

### Add More Questions
Edit `data/responses.js`:
```javascript
yourQuestion: {
    explanation: 'Your explanation text...'
}
```

### Change Colors
Edit `styles.css`:
```css
:root {
    --primary-blue: #1e40af;  ← Change this
    --accent-orange: #f59e0b; ← And this
    /* ... etc ... */
}
```

### Add Hindi Translations
Edit `index.html` and add `data-hi` attributes:
```html
<span data-en="Your text" data-hi="आपका टेक्स्ट">Your text</span>
```

---

## **Project Size**

- **Total project:** ~200-300 KB (well under 10 MB limit!)
- **No node_modules** stored in repo
- **Single branch** (main)
- **Minimal dependencies** - pure vanilla JavaScript

---

## **Performance Optimization**

The app is lightweight:
- **Load time:** < 1 second
- **No heavy libraries**
- **Responsive on all devices**
- **Works offline** (basic features)
- **Fast API responses** with caching

---

## **Support & Resources**

| Resource | Link |
|----------|------|
| **Election Commission India** | https://eci.gov.in |
| **Voter Search Portal** | https://electoralsearch.eci.gov.in/ |
| **Voter Helpline (Call)** | 1950 (toll-free) |
| **Google AI Studio** | https://ai.google.dev/ |
| **Netlify Docs** | https://docs.netlify.com |
| **Vercel Docs** | https://vercel.com/docs |

---

## **Next Steps**

1. ✅ Open the app - it works immediately!
2. ✅ Get a Gemini API key for smarter responses
3. ✅ Deploy online for free
4. ✅ Share with first-time voters!
5. ✅ Gather feedback and iterate

---

## **Made with ❤️ for First-Time Voters**

Help young Indians understand their voting rights! 🇮🇳

**Questions?** Check the README.md for detailed documentation.
