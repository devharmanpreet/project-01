/**
 * ============================================================
 * Election Guide Assistant - Main Application
 * ============================================================
 * Main application controller and UI logic
 */

// Application state
const app = {
    isLoading: false,
    currentLanguage: 'english',
    messagesCount: 0
};

/**
 * Initialize the application
 */
function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Restore session if exists
    restoreSession();
    
    // Display initial greeting
    displayInitialGreeting();
    
    // Populate states dropdown
    populateStatesDropdown();
    
    // Set up language toggle
    updateUILanguage();
    
    // Test API configuration (optional)
    checkApiConfiguration();
    
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Message form
    const messageForm = document.getElementById('messageForm');
    messageForm.addEventListener('submit', handleMessageSubmit);
    
    // Language toggle
    const languageToggle = document.getElementById('languageToggle');
    languageToggle.addEventListener('click', toggleLanguage);
    
    // Hint buttons
    const hintButtons = document.querySelectorAll('.hint-button');
    hintButtons.forEach(btn => {
        btn.addEventListener('click', handleHintButtonClick);
    });
    
    // Modal close buttons
    document.getElementById('modalClose').addEventListener('click', closeChecklistModal);
    document.getElementById('infoModalClose').addEventListener('click', closeInfoModal);
    
    // Info form
    document.getElementById('infoForm').addEventListener('submit', handleInfoFormSubmit);
    
    // Start voting button
    document.getElementById('startVotingBtn').addEventListener('click', handleStartVoting);
}

/**
 * Handle message form submission
 */
async function handleMessageSubmit(event) {
    event.preventDefault();
    
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    input.focus();
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Show loading indicator
    showTypingIndicator();
    app.isLoading = true;
    
    try {
        // Process with assistant
        const response = await assistant.processMessage(message);
        
        // Remove loading indicator
        removeTypingIndicator();
        
        // Add assistant response
        addMessageToChat(response, 'assistant');
        
        // Log the exchange
        assistant.logMessage(message, response);
        
        // Update progress if Q&A completed
        updateProgressTracker();
        
    } catch (error) {
        removeTypingIndicator();
        addMessageToChat('Sorry, I encountered an error. Please try again.', 'assistant');
    } finally {
        app.isLoading = false;
    }
}

/**
 * Add message to chat display
 * @param {String} text
 * @param {String} sender - 'user' or 'assistant'
 */
function addMessageToChat(text, sender) {
    const container = document.getElementById('messagesContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = formatTime(new Date());
    
    messageDiv.appendChild(bubbleDiv);
    messageDiv.appendChild(timeDiv);
    
    container.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
    
    app.messagesCount++;
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const container = document.getElementById('messagesContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = 'typingIndicator';
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble typing-bubble';
    bubbleDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    messageDiv.appendChild(bubbleDiv);
    container.appendChild(messageDiv);
    
    container.scrollTop = container.scrollHeight;
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

/**
 * Display initial greeting
 */
function displayInitialGreeting() {
    const session = getOrCreateSession();
    
    let greeting = '';
    if (session.userProfile.age === null) {
        greeting = `👋 Welcome to Election Guide Assistant!\n\nI'm here to help you understand India's voting process. Whether you're a first-time voter or have questions about elections, I've got you covered.\n\nLet's start! 🗳️`;
    } else {
        greeting = `Welcome back! 👋 What would you like to know today?`;
    }
    
    addMessageToChat(greeting, 'assistant');
}

/**
 * Handle hint button clicks
 */
async function handleHintButtonClick(event) {
    const button = event.target.closest('.hint-button');
    const action = button.dataset.action;
    
    let message = '';
    switch (action) {
        case 'ready-check':
            message = assistant.generateReadinessList();
            addMessageToChat('Am I ready?', 'user');
            addMessageToChat(message, 'assistant');
            logAnalytics('ready_check_clicked');
            break;
        case 'ask-nota':
            message = 'What is NOTA?';
            addMessageToChat(message, 'user');
            await handleMessageSubmit(new Event('submit'));
            logAnalytics('nota_asked');
            break;
        case 'ask-evm':
            message = 'How does EVM work?';
            addMessageToChat(message, 'user');
            await handleMessageSubmit(new Event('submit'));
            logAnalytics('evm_asked');
            break;
    }
}

/**
 * Toggle language between English and Hindi
 */
function toggleLanguage() {
    app.currentLanguage = app.currentLanguage === 'english' ? 'hindi' : 'english';
    assistant.setLanguage(app.currentLanguage);
    updateUILanguage();
    
    const languageToggle = document.getElementById('languageToggle');
    languageToggle.textContent = app.currentLanguage === 'english' 
        ? 'English / हिंदी' 
        : 'हिंदी / English';
    
    logAnalytics('language_changed', { language: app.currentLanguage });
}

/**
 * Update UI language (show appropriate text based on language)
 */
function updateUILanguage() {
    const lang = app.currentLanguage;
    const attr = lang === 'english' ? 'data-en' : 'data-hi';
    
    document.querySelectorAll('[data-en][data-hi]').forEach(elem => {
        elem.textContent = elem.getAttribute(attr);
    });
}

/**
 * Update progress tracker
 */
function updateProgressTracker() {
    const profile = assistant.getUserProfile();
    
    // Update step indicators
    if (profile.age !== null) {
        document.getElementById('step-1').classList.add('completed');
    }
    
    if (profile.hasVoterId !== null || profile.state !== null) {
        document.getElementById('step-2').classList.add('completed');
        document.getElementById('step-3').classList.add('active');
    }
    
    if (profile.isFirstTime !== null) {
        document.getElementById('step-3').classList.add('completed');
    }
}

/**
 * Show readiness checklist modal
 */
function showChecklistModal() {
    const modal = document.getElementById('checklistModal');
    const container = document.getElementById('checklistContainer');
    
    const profile = assistant.getUserProfile();
    container.innerHTML = '';
    
    // Build checklist items
    const items = [
        {
            text: `Age Check: ${profile.age} years old`,
            done: profile.age && profile.age >= 18
        },
        {
            text: 'Voter ID Status: ' + (profile.hasVoterId || 'Not confirmed'),
            done: profile.hasVoterId === 'Yes'
        },
        {
            text: 'State: ' + (profile.state || 'Not selected'),
            done: !!profile.state
        },
        {
            text: 'First time voter awareness',
            done: profile.isFirstTime !== null
        }
    ];
    
    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `checklist-item ${item.done ? 'checked' : ''}`;
        
        const checkbox = document.createElement('div');
        checkbox.className = 'checklist-checkbox';
        checkbox.innerHTML = item.done ? '✓' : '';
        
        const text = document.createElement('span');
        text.className = 'checklist-text';
        text.textContent = item.text;
        
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(text);
        container.appendChild(itemDiv);
    });
    
    modal.classList.add('active');
}

/**
 * Close checklist modal
 */
function closeChecklistModal() {
    document.getElementById('checklistModal').classList.remove('active');
}

/**
 * Show info form modal
 */
function showInfoModal() {
    document.getElementById('infoModal').classList.add('active');
}

/**
 * Close info modal
 */
function closeInfoModal() {
    document.getElementById('infoModal').classList.remove('active');
}

/**
 * Handle info form submission
 */
function handleInfoFormSubmit(event) {
    event.preventDefault();
    
    const age = parseInt(document.getElementById('ageInput').value);
    const voterId = document.getElementById('voterId').value;
    const state = document.getElementById('stateSelect').value;
    const firstTime = document.getElementById('firstTime').value;
    
    // Update assistant with user info
    assistant.userResponses = {
        age: age,
        hasVoterId: voterId,
        state: state,
        isFirstTime: firstTime === 'Yes' ? 'Yes' : 'No'
    };
    
    // Update session
    assistant.session.userProfile = {
        age: age,
        hasVoterId: voterId,
        state: state,
        isFirstTime: firstTime === 'Yes' ? 'Yes' : 'No'
    };
    saveSession(assistant.session);
    
    // Close modal and update UI
    closeInfoModal();
    updateProgressTracker();
    
    // Show personalized message
    const msg = `Perfect! I've got your info. Now I can give you personalized guidance for voting in India. What would you like to know?`;
    addMessageToChat(msg, 'assistant');
    
    logAnalytics('profile_completed', { age, state });
}

/**
 * Handle start voting button
 */
function handleStartVoting() {
    closeChecklistModal();
    const msg = `Great! You're all set to vote! 🎉\n\n📍 To find your polling station and voting time:\n1. Visit: https://electoralsearch.eci.gov.in/\n2. Check your assigned booth location\n3. Go on voting day and cast your vote!\n\nThank you for being a responsible voter! 🇮🇳`;
    addMessageToChat(msg, 'assistant');
    
    const profile = assistant.getUserProfile();
    logAnalytics('voting_started', { state: profile.state });
}

/**
 * Populate states dropdown
 */
function populateStatesDropdown() {
    const select = document.getElementById('stateSelect');
    
    STATES.forEach(state => {
        const option = document.createElement('option');
        option.value = state.code;
        option.textContent = state.name;
        select.appendChild(option);
    });
}

/**
 * Restore session from storage
 */
function restoreSession() {
    const session = retrieveData('election_session');
    if (session && session.userProfile.age !== null) {
        // Update assistant with restored session
        assistant.session = session;
        assistant.userResponses = session.userProfile;
        updateProgressTracker();
    }
}

/**
 * Check API configuration
 */
async function checkApiConfiguration() {
    if (!isApiKeyConfigured()) {
        // Optionally show a message to user
    } else {
        try {
            const isWorking = await testGeminiApi();
            if (isWorking) {
                logAnalytics('api_ready');
            } else {
            }
        } catch (error) {
        }
    }
}

/**
 * Export session data
 */
function exportSessionData() {
    const data = exportForSheets();
    return data;
}

/**
 * Handle enter key in message input
 */
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        const input = document.getElementById('messageInput');
        if (document.activeElement === input) {
            event.preventDefault();
            document.getElementById('messageForm').dispatchEvent(new Event('submit'));
        }
    }
});

/**
 * Prevent body scroll when modal is open
 */
const observer = new MutationObserver(() => {
    const modals = document.querySelectorAll('.modal.active');
    document.body.style.overflow = modals.length > 0 ? 'hidden' : 'auto';
});

observer.observe(document.body, { childList: true, subtree: true });

/**
 * Set up modal click outside to close
 */
document.getElementById('checklistModal').addEventListener('click', (e) => {
    if (e.target.id === 'checklistModal') {
        closeChecklistModal();
    }
});

document.getElementById('infoModal').addEventListener('click', (e) => {
    if (e.target.id === 'infoModal') {
        closeInfoModal();
    }
});

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Log app initialization
logAnalytics('app_loaded', { 
    browser: navigator.userAgent,
    language: app.currentLanguage
});
