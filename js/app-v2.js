/**
 * Product shell for VoteReady India.
 * Handles UI rendering, interaction chips, and progress flow.
 */
const app = {
    isLoading: false,
    currentLanguage: 'english'
};

function initializeApp() {
    setupEventListeners();
    hydrateFromSession();
    renderWelcomeMessage();
    populateStateSuggestions();
    updateProgressTracker();
}

function setupEventListeners() {
    document.getElementById('messageForm').addEventListener('submit', handleMessageSubmit);
    document.getElementById('languageToggle').addEventListener('click', toggleLanguage);

    document.querySelectorAll('.hint-button').forEach((btn) => {
        btn.addEventListener('click', () => handlePresetAction(btn.dataset.action));
    });
}

async function handleMessageSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text || app.isLoading) return;
    input.value = '';

    await processUserMessage(text);
}

async function processUserMessage(text) {
    addMessageToChat(text, 'user');
    app.isLoading = true;
    showTypingIndicator();

    try {
        const response = await assistant.handleMessage(text);
        removeTypingIndicator();
        addMessageToChat(response, 'assistant');
        renderDynamicQuickReplies();
        updateProgressTracker();
        hideWelcomePanel();
        assistant.logMessage(text, response);
    } catch (error) {
        removeTypingIndicator();
        addMessageToChat('Something went wrong. Please try again once.', 'assistant');
    } finally {
        app.isLoading = false;
    }
}

function addMessageToChat(text, sender) {
    const container = document.getElementById('messagesContainer');
    const message = document.createElement('div');
    message.className = `message ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = formatTime(new Date());

    message.appendChild(bubble);
    message.appendChild(time);
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('messagesContainer');
    const wrapper = document.createElement('div');
    wrapper.className = 'message assistant';
    wrapper.id = 'typingIndicator';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble typing-bubble';
    bubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    wrapper.appendChild(bubble);
    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function renderWelcomeMessage() {
    const profile = assistant.getUserProfile();
    if (profile.age) {
        addMessageToChat('Welcome back. I can continue your voting plan from where you left.', 'assistant');
    } else {
        addMessageToChat('Hi! I am your Election Guide Assistant. I will quickly help you with eligibility, registration, and polling day steps.', 'assistant');
        addMessageToChat('Start by telling me your age.', 'assistant');
    }
    renderDynamicQuickReplies();
}

function renderDynamicQuickReplies() {
    const hints = document.querySelector('.input-hints');
    hints.innerHTML = '';
    assistant.getQuickReplies().forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hint-button';
        btn.textContent = item;
        btn.addEventListener('click', () => processUserMessage(item));
        hints.appendChild(btn);
    });
}

function handlePresetAction(action) {
    const map = {
        'start-journey': 'Start onboarding',
        'quick-ready': 'Give my final checklist',
        'registration-help': 'How to register online?',
        'evm-explainer': 'How does EVM work?'
    };
    if (map[action]) processUserMessage(map[action]);
}

function updateProgressTracker() {
    const step = assistant.getJourneyStep();
    [1, 2, 3].forEach((n) => {
        const node = document.getElementById(`step-${n}`);
        node.classList.remove('active', 'completed');
        if (n < step) node.classList.add('completed');
        if (n === step) node.classList.add('active');
    });
}

function toggleLanguage() {
    app.currentLanguage = app.currentLanguage === 'english' ? 'hindi' : 'english';
    assistant.setLanguage(app.currentLanguage);
    document.getElementById('languageToggle').textContent = app.currentLanguage === 'english' ? 'EN / Hinglish' : 'Hinglish / EN';
    addMessageToChat(
        app.currentLanguage === 'english'
            ? 'Language set to English mode.'
            : 'Language set to Hinglish mode.',
        'assistant'
    );
}

function populateStateSuggestions() {
    const list = document.getElementById('stateSuggestions');
    STATES.forEach((state) => {
        const option = document.createElement('option');
        option.value = state.name;
        list.appendChild(option);
    });
}

function hydrateFromSession() {
    const s = retrieveData('election_session');
    if (!s) return;
    app.currentLanguage = s.language || 'english';
    document.getElementById('languageToggle').textContent = app.currentLanguage === 'english' ? 'EN / Hinglish' : 'Hinglish / EN';
}

function hideWelcomePanel() {
    const panel = document.getElementById('welcomePanel');
    if (panel) panel.style.display = 'none';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
