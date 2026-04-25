/**
 * Product shell for VoteReady India.
 * Handles UI rendering, interaction chips, and progress flow.
 */
const app = {
    isLoading: false,
    currentLanguage: 'english',
    hasStarted: false
};

function initializeApp() {
    setupEventListeners();
    hydrateFromSession();
    populateStateSuggestions();
}

function setupEventListeners() {
    document.getElementById('messageForm').addEventListener('submit', handleMessageSubmit);
    document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
    document.getElementById('heroGetStarted').addEventListener('click', startAssistantExperience);
    document.getElementById('landingStartNow').addEventListener('click', startAssistantExperience);
    document.getElementById('heroHowItWorks').addEventListener('click', scrollToHowItWorks);
    document.getElementById('heroHowItWorksTop').addEventListener('click', scrollToHowItWorks);

    document.querySelectorAll('.welcome-cta').forEach((btn) => {
        btn.addEventListener('click', () => handlePresetAction(btn.dataset.action));
    });
}

async function handleMessageSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('messageInput');
    if (app.isLoading) return;

    const validated = validateMessageInput(input.value);
    if (!validated.ok) {
        if (validated.reason === 'empty') {
            announceForAccessibility('Please enter a message before sending.');
            return;
        }
        if (validated.reason === 'too_long') {
            input.value = validated.value;
            announceForAccessibility('Message was too long and has been shortened to 300 characters.');
            return;
        }
    }
    const text = validated.value;
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
        persistSessionForGoogleServices();
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
    announceForAccessibility(`${sender} message added`);
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
    const messages = assistant.getWelcomeMessages();
    messages.forEach((message) => addMessageToChat(message, 'assistant'));
    renderDynamicQuickReplies();
}

function renderDynamicQuickReplies() {
    const hints = document.getElementById('quickRepliesBar');
    hints.innerHTML = '';
    const fragment = document.createDocumentFragment();
    assistant.getQuickReplies().forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hint-button';
        btn.textContent = item;
        btn.setAttribute('aria-label', `Quick reply: ${item}`);
        btn.addEventListener('click', () => processUserMessage(item));
        fragment.appendChild(btn);
    });
    hints.appendChild(fragment);
}

function handlePresetAction(action) {
    if (app.isLoading) return;
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
    persistSessionForGoogleServices();
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

function startAssistantExperience() {
    if (app.hasStarted) return;
    app.hasStarted = true;

    const landing = document.getElementById('landingPage');
    const shell = document.getElementById('appShell');

    landing.style.display = 'none';
    shell.classList.add('active');
    shell.setAttribute('aria-hidden', 'false');

    renderWelcomeMessage();
    updateProgressTracker();
    persistSessionForGoogleServices();

    const input = document.getElementById('messageInput');
    if (input) input.focus();
}

function scrollToHowItWorks() {
    const section = document.getElementById('howItWorksSection');
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideWelcomePanel() {
    const panel = document.getElementById('welcomePanel');
    if (panel) panel.style.display = 'none';
}

function announceForAccessibility(message) {
    const statusNode = document.getElementById('a11yStatus');
    if (!statusNode) return;
    statusNode.textContent = message;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
