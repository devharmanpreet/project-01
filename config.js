/**
 * ============================================================
 * Configuration & Environment Variables
 * ============================================================
 * 
 * IMPORTANT: Never commit API keys to version control!
 * 
 * Setup Instructions:
 * 1. Copy .env.example to .env.js
 * 2. Add your actual API key to .env.js
 * 3. .env.js is in .gitignore and won't be committed
 * 4. Load this file BEFORE other scripts in index.html
 */

// Default configuration (safe defaults)
const CONFIG = {
    GEMINI_API_KEY: '',
    API_ENDPOINT: '',
    GOOGLE_SHEET_ID: '',
    DEBUG_MODE: false
};

// Function to load environment from .env.js if it exists
function loadEnvironment() {
    // Try to use .env.js if it was loaded
    if (typeof ENV !== 'undefined') {
        CONFIG.GEMINI_API_KEY = ENV.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY;
        CONFIG.API_ENDPOINT = ENV.API_ENDPOINT || CONFIG.API_ENDPOINT;
        CONFIG.GOOGLE_SHEET_ID = ENV.GOOGLE_SHEET_ID || CONFIG.GOOGLE_SHEET_ID;
        CONFIG.DEBUG_MODE = ENV.DEBUG_MODE || CONFIG.DEBUG_MODE;
    }
    
    // Try to get from localStorage (set by user in settings)
    const stored = retrieveData('user_config');
    if (stored) {
        CONFIG.GEMINI_API_KEY = stored.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY;
        CONFIG.DEBUG_MODE = stored.DEBUG_MODE || CONFIG.DEBUG_MODE;
    }
}

// Function to set API key (for runtime configuration)
function setApiKey(key) {
    CONFIG.GEMINI_API_KEY = key;
    // Optionally save to localStorage
    const config = retrieveData('user_config') || {};
    config.GEMINI_API_KEY = key;
    storeData('user_config', config);
}

// Function to get API key
function getApiKey() {
    return CONFIG.GEMINI_API_KEY;
}

// Function to check if API is configured
function isApiConfigured() {
    return CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'your_api_key_here';
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadEnvironment);
