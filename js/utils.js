/**
 * ============================================================
 * Utility Functions for Election Guide Assistant
 * ============================================================
 * Helper functions for common operations
 */

/**
 * Generate unique ID for sessions/messages
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format date to readable format
 * @param {Date|String} date
 * @returns {String} Formatted date
 */
function formatDate(date) {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Format time to HH:MM format
 * @param {Date|String} date
 * @returns {String} Formatted time
 */
function formatTime(date) {
    const d = new Date(date);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
}

/**
 * Store data in localStorage
 * @param {String} key
 * @param {*} value
 */
function storeData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('Failed to store data:', e);
    }
}

/**
 * Retrieve data from localStorage
 * @param {String} key
 * @returns {*} Stored value or null
 */
function retrieveData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.warn('Failed to retrieve data:', e);
        return null;
    }
}

/**
 * Clear data from localStorage
 * @param {String} key
 */
function clearData(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.warn('Failed to clear data:', e);
    }
}

/**
 * Determine age group from age
 * @param {Number} age
 * @returns {String} Age group
 */
function getAgeGroup(age) {
    if (age < 18) return 'under18';
    if (age < 25) return 'young-adult';
    if (age < 60) return 'adult';
    return 'senior';
}

/**
 * Check if user is eligible to vote
 * @param {Number} age
 * @returns {Boolean}
 */
function isEligibleToVote(age) {
    return age >= 18;
}

/**
 * Validate email format
 * @param {String} email
 * @returns {Boolean}
 */
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Sanitize text input (prevent XSS)
 * @param {String} text
 * @returns {String} Sanitized text
 */
function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Escape special characters for HTML
 * @param {String} text
 * @returns {String} Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Create a session object for storing user data
 * @returns {Object} Session object
 */
function createSession() {
    return {
        id: generateId(),
        createdAt: new Date(),
        userProfile: {
            age: null,
            hasVoterId: null,
            state: null,
            isFirstTime: null
        },
        messages: [],
        readyToVote: false,
        language: 'english'
    };
}

/**
 * Get current session or create new
 * @returns {Object} Session object
 */
function getOrCreateSession() {
    let session = retrieveData('election_session');
    if (!session) {
        session = createSession();
        storeData('election_session', session);
    }
    return session;
}

/**
 * Save session data
 * @param {Object} session
 */
function saveSession(session) {
    storeData('election_session', session);
}

/**
 * Get remaining days until a date
 * @param {String|Date} targetDate
 * @returns {Number} Days remaining
 */
function getDaysUntil(targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    const diff = target - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Translate UI text based on language
 * @param {String} key - Data attribute key (data-en or data-hi)
 * @param {String} lang - Language ('english' or 'hindi')
 * @returns {String} Translated text
 */
function translate(key, lang) {
    const elem = document.querySelector(`[data-${lang === 'english' ? 'en' : 'hi'}]`);
    return elem ? elem.getAttribute(`data-${lang === 'english' ? 'en' : 'hi'}`) : key;
}

/**
 * Debounce function to limit function calls
 * @param {Function} func
 * @param {Number} wait
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func
 * @param {Number} wait
 * @returns {Function} Throttled function
 */
function throttle(func, wait) {
    let timeout;
    return function(...args) {
        if (!timeout) {
            func.apply(this, args);
            timeout = setTimeout(() => timeout = null, wait);
        }
    };
}

/**
 * Parse user message to extract intent
 * @param {String} text
 * @returns {Object} Message intent and keywords
 */
function parseMessage(text) {
    const lower = text.toLowerCase().trim();
    
    // Detect questions about specific topics
    const keywords = {
        nota: ['nota', 'none of the above'],
        evm: ['evm', 'electronic', 'voting machine'],
        voterIdQ: ['voter id', 'voter card', 'epic', 'electoral card'],
        registration: ['register', 'registration', 'enroll'],
        polling: ['polling station', 'booth', 'where to vote'],
        dates: ['when', 'date', 'schedule', 'timeline'],
        eligibility: ['eligible', 'can i vote', 'age', 'requirements'],
        ready: ['ready', 'how to vote', 'process', 'steps']
    };

    const detected = {};
    for (let [key, terms] of Object.entries(keywords)) {
        if (terms.some(term => lower.includes(term))) {
            detected[key] = true;
        }
    }

    return {
        text: text,
        lower: lower,
        hasQuestion: text.includes('?'),
        detected: detected
    };
}

/**
 * Chunk text into smaller pieces
 * @param {String} text
 * @param {Number} chunkSize
 * @returns {Array} Array of text chunks
 */
function chunkText(text, chunkSize = 500) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.substring(i, i + chunkSize));
    }
    return chunks;
}

/**
 * Log analytics data (for future integration)
 * @param {String} event
 * @param {Object} data
 */
function logAnalytics(event, data = {}) {
    const analytics = {
        event: event,
        timestamp: new Date(),
        data: data,
        session: getOrCreateSession().id
    };
    
    // Store locally
    let logs = retrieveData('analytics_logs') || [];
    logs.push(analytics);
    storeData('analytics_logs', logs);
    
    console.log('[Analytics]', event, data);
}

/**
 * Export session data for Google Sheets
 * @returns {Object} Data formatted for Sheets
 */
function exportForSheets() {
    const session = getOrCreateSession();
    return {
        timestamp: new Date().toISOString(),
        sessionId: session.id,
        age: session.userProfile.age,
        hasVoterId: session.userProfile.hasVoterId,
        state: session.userProfile.state,
        isFirstTime: session.userProfile.isFirstTime,
        readyToVote: session.readyToVote,
        messageCount: session.messages.length,
        language: session.language
    };
}

/**
 * Get random greeting
 * @returns {String} Greeting text
 */
function getRandomGreeting() {
    const greetings = [
        "Hello! I'm your Election Guide Assistant. Ready to learn about voting in India?",
        "Hi there! Let's help you understand the voting process step by step.",
        "Welcome! I'm here to guide you through India's election system.",
        "Hello! Let's make sure you're all set to cast your vote.",
        "Hi! I'm your voting companion. What would you like to know?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}

/**
 * Detect language from text
 * @param {String} text
 * @returns {String} 'hindi' or 'english'
 */
function detectLanguage(text) {
    // Simple detection - check for Hindi characters
    const hindiRegex = /[\u0900-\u097F]/g;
    return (text.match(hindiRegex) || []).length > (text.length / 2) ? 'hindi' : 'english';
}
