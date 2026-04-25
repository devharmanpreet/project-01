/**
 * ============================================================
 * Google Gemini API Integration
 * ============================================================
 * Handles communication with Google Generative AI (Gemini)
 */

// Configuration (will be populated from config.js/environment)
const GEMINI_CONFIG = {
    apiKey: '', // Will be set from CONFIG.GEMINI_API_KEY
    apiUrl: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
    temperature: 0.7,
    maxTokens: 1000
};

// Initialize API key from config
function initializeGeminiApi() {
    if (typeof CONFIG !== 'undefined') {
        GEMINI_CONFIG.apiKey = CONFIG.GEMINI_API_KEY;
    }
}

/**
 * Set API key (call this before making requests)
 * @param {String} apiKey - Your Google Gemini API key
 */
function setGeminiApiKey(apiKey) {
    GEMINI_CONFIG.apiKey = apiKey;
    if (typeof setApiKey === 'function') {
        setApiKey(apiKey); // Also save to config
    }
}

/**
 * Check if API key is configured
 * @returns {Boolean}
 */
function isApiKeyConfigured() {
    return Boolean(
        GEMINI_CONFIG.apiKey &&
        GEMINI_CONFIG.apiKey !== 'YOUR_GEMINI_API_KEY' &&
        GEMINI_CONFIG.apiKey !== 'your_api_key_here'
    );
}

/**
 * Generate text using Gemini API
 * @param {String} prompt - The prompt to send
 * @param {Object} options - Additional options
 * @returns {Promise<String>} Generated response
 */
async function generateWithGemini(prompt, options = {}) {
    // Check if API key is set
    if (!isApiKeyConfigured()) {
        return generateWithFallback(prompt, options);
    }

    try {
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: options.temperature || GEMINI_CONFIG.temperature,
                maxOutputTokens: options.maxTokens || GEMINI_CONFIG.maxTokens,
                topP: 0.95,
                topK: 40
            },
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_ONLY_HIGH'
                },
                {
                    category: 'HARM_CATEGORY_HATE_SPEECH',
                    threshold: 'BLOCK_ONLY_HIGH'
                }
            ]
        };

        const response = await fetch(
            `${GEMINI_CONFIG.apiUrl}?key=${GEMINI_CONFIG.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`API Error: ${error.error?.message || response.statusText}`);
        }

        const data = await response.json();
        
        // Extract text from response
        if (data.candidates && data.candidates[0]?.content?.parts) {
            return data.candidates[0].content.parts[0].text;
        }

        throw new Error('Unexpected API response format');
    } catch (error) {
        console.error('Gemini API error:', error);
        // Fallback to mock responses if API fails
        return generateWithFallback(prompt, options);
    }
}

/**
 * Answer a question about elections
 * @param {String} question - User's question
 * @param {String} context - Context about user (age, state, etc.)
 * @param {String} language - Language preference ('english' or 'hindi')
 * @returns {Promise<String>} Answer
 */
async function answerElectionQuestion(question, context = '', language = 'english') {
    const systemPrompt = `You are VoteReady India, a civic assistant for Indian elections.
Your job is to guide a user with practical, step-by-step actions.

Response style rules:
1) Never give generic chatbot replies.
2) Always include a clear next action.
3) Keep language simple and human.
4) If language is hindi, answer in natural Hinglish (Roman Hindi + English mix).
5) If legal/process detail is uncertain, say "verify on ECI portal" and still provide useful next steps.

Output format:
- Max 6 short bullet points OR 2 short paragraphs.
- Include one mini example when explaining EVM, NOTA, or registration.
- Mention official portals when relevant.

Language mode: ${language === 'hindi' ? 'Hinglish' : 'English'}
User context: ${context || 'No specific context provided'}`;

    const fullPrompt = `${systemPrompt}\n\nQuestion: ${question}`;

    return await generateWithGemini(fullPrompt, {
        temperature: 0.7,
        maxTokens: 800,
        originalQuestion: question
    });
}

/**
 * Fallback responses for when API is unavailable
 * Uses pre-defined responses from responses.js
 * @param {String} prompt
 * @param {Object} options
 * @returns {String} Response
 */
function generateWithFallback(prompt, options = {}) {
    console.warn('Using fallback responses (API not configured)');
    
    const source = (options.originalQuestion || prompt || '').toLowerCase();
    
    // Detect topic from prompt
    if (source.includes('nota')) {
        return ELECTION_RESPONSES.nota.explanation;
    }
    if (source.includes('evm')) {
        return ELECTION_RESPONSES.evm.explanation;
    }
    if (source.includes('voter id') || source.includes('epic')) {
        return ELECTION_RESPONSES.voterId.explanation;
    }
    if (source.includes('first time') || source.includes('beginner')) {
        return ELECTION_RESPONSES.firstTimeVoter.guidance;
    }
    if (source.includes('eligible') || source.includes('age')) {
        return ELECTION_RESPONSES.eligibility.info;
    }
    if (source.includes('register')) {
        return ELECTION_RESPONSES.registration.steps;
    }
    if (source.includes('how') || source.includes('process')) {
        return ELECTION_RESPONSES.votingProcess.steps;
    }

    // Default response
    return `I'm your Election Guide Assistant. I can help you with questions about:
• Voter eligibility and registration
• How to get a Voter ID
• Voting process and EVM systems
• NOTA (None of the Above)
• Finding your polling station
• State-specific voting information

What would you like to know? Just ask me!`;
}

/**
 * Generate a personalized guidance message
 * @param {Object} userProfile - User profile object
 * @returns {Promise<String>} Personalized message
 */
async function generatePersonalizedGuidance(userProfile) {
    const contextStr = `
        Age: ${userProfile.age}
        Has Voter ID: ${userProfile.hasVoterId}
        State: ${userProfile.state}
        First-time voter: ${userProfile.isFirstTime}
    `;

    const prompt = `Based on this user profile, provide a personalized, encouraging message about their voting readiness:
${contextStr}

The message should:
- Address their specific situation
- Be warm and encouraging
- Highlight any actions they still need to take
- Be 2-3 sentences maximum`;

    return await generateWithGemini(prompt, { temperature: 0.8 });
}

/**
 * Generate a summary of user's voting readiness
 * @param {Object} userProfile
 * @returns {Promise<String>} Summary
 */
async function generateReadinessSummary(userProfile) {
    const isEligible = userProfile.age >= 18;
    const hasId = userProfile.hasVoterId === 'Yes' || userProfile.hasVoterId === true;
    
    let prompt = `Summarize the voting readiness of this person:\n`;
    prompt += `Age: ${userProfile.age} (${isEligible ? 'Eligible' : 'Not yet eligible'} to vote)\n`;
    prompt += `Voter ID: ${hasId ? 'Already has one' : 'Needs to apply'}\n`;
    prompt += `State: ${userProfile.state}\n`;
    prompt += `First-time voter: ${userProfile.isFirstTime}\n`;
    prompt += `\nProvide a brief (2-3 sentences) readiness assessment and next steps.`;

    return await generateWithGemini(prompt, { temperature: 0.6 });
}

/**
 * Verify a response contains election-related content
 * @param {String} response
 * @returns {Boolean}
 */
function isElectionRelated(response) {
    const keywords = [
        'vote', 'voter', 'election', 'poll', 'ballot', 'evm', 'voting',
        'candidate', 'party', 'registration', 'booth', 'state', 'election commission',
        'eligible', 'voter id', 'epic', 'nota', 'credential', 'elector'
    ];
    
    const lower = response.toLowerCase();
    return keywords.some(keyword => lower.includes(keyword));
}

/**
 * Cache responses locally to reduce API calls
 * @param {String} question
 * @param {String} response
 */
function cacheResponse(question, response) {
    let cache = retrieveData('gemini_cache') || {};
    cache[question.toLowerCase()] = {
        response: response,
        timestamp: Date.now()
    };
    storeData('gemini_cache', cache);
}

/**
 * Get cached response if available
 * @param {String} question
 * @param {Number} maxAge - Maximum age in milliseconds (default: 1 hour)
 * @returns {String|null}
 */
function getCachedResponse(question, maxAge = 3600000) {
    const cache = retrieveData('gemini_cache') || {};
    const cached = cache[question.toLowerCase()];
    
    if (cached && (Date.now() - cached.timestamp) < maxAge) {
        return cached.response;
    }
    
    return null;
}

/**
 * Clear response cache
 */
function clearResponseCache() {
    clearData('gemini_cache');
}

/**
 * Handle errors from API
 * @param {Error} error
 * @returns {String} Error message
 */
function handleApiError(error) {
    if (error.message.includes('API Error')) {
        return `I'm experiencing temporary issues. Let me try to help you with my built-in knowledge. What would you like to know?`;
    }
    if (error.message.includes('Network')) {
        return `Please check your internet connection and try again.`;
    }
    return `I encountered an issue, but I can still help! Ask me about voting in India.`;
}

/**
 * Make a test API call to verify configuration
 * @returns {Promise<Boolean>}
 */
async function testGeminiApi() {
    if (!isApiKeyConfigured()) {
        console.warn('Gemini API key not configured');
        return false;
    }

    try {
        const response = await generateWithGemini('Say "Hello" in one word.');
        return response && response.length > 0;
    } catch (error) {
        console.error('Gemini API test failed:', error);
        return false;
    }
}
