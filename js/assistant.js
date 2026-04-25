/**
 * ============================================================
 * Election Guide Assistant - Core Logic
 * ============================================================
 * Implements the intelligent conversation flow and decision logic
 */

class ElectionAssistant {
    constructor() {
        this.session = getOrCreateSession();
        this.conversationState = 'greeting';
        this.userResponses = {
            age: null,
            hasVoterId: null,
            state: null,
            isFirstTime: null,
            pollingBooth: null
        };
        this.currentQuestion = 0;
        this.questions = [
            { type: 'age', text: "First, let's know your age. How old are you?" },
            { type: 'voterId', text: "Do you have a Voter ID (EPIC)?" },
            { type: 'state', text: "Which state or union territory are you from?" },
            { type: 'firstTime', text: "Is this your first time voting?" }
        ];
    }

    /**
     * Process user input and generate response
     * @param {String} userMessage
     * @returns {Promise<String>} Assistant response
     */
    async processMessage(userMessage) {
        const trimmed = userMessage.trim();
        
        // Parse the message
        const parsed = parseMessage(trimmed);
        
        // Small talk and general queries
        if (!parsed.hasQuestion && (parsed.lower.includes('hi') || parsed.lower.includes('hello'))) {
            return this.handleGreeting();
        }

        // Check if it's a specific question
        if (parsed.detected.nota) {
            return await this.answerQuestion('NOTA');
        }
        if (parsed.detected.evm) {
            return await this.answerQuestion('EVM');
        }
        if (parsed.detected.voterIdQ) {
            return await this.answerQuestion('VoterId');
        }
        if (parsed.detected.registration) {
            return await this.answerQuestion('Registration');
        }
        if (parsed.detected.polling) {
            return await this.answerQuestion('Polling');
        }
        if (parsed.detected.eligibility) {
            return await this.answerQuestion('Eligibility');
        }
        if (parsed.detected.ready) {
            return this.generateReadinessList();
        }

        // Try to match with current question flow
        if (this.isAnsweringQuestion()) {
            return await this.processQuestionResponse(trimmed);
        }

        // Default: treat as general question and use Gemini
        return await this.answerWithGemini(trimmed);
    }

    /**
     * Handle greeting message
     * @returns {String}
     */
    handleGreeting() {
        if (this.session.userProfile.age !== null) {
            // User already provided info
            return `Welcome back! What would you like to know about voting in India?`;
        } else {
            // New user
            return `Hi there! 👋 I'm your Election Guide Assistant. I'll help you understand the voting process in India step by step. Let's start with a few quick questions to personalize the guidance for you.\n\n${this.questions[0].text}`;
        }
    }

    /**
     * Check if currently in question flow
     * @returns {Boolean}
     */
    isAnsweringQuestion() {
        return this.currentQuestion < this.questions.length && this.userResponses.age === null;
    }

    /**
     * Process response to current question
     * @param {String} response
     * @returns {Promise<String>} Next question or confirmation
     */
    async processQuestionResponse(response) {
        const currentQ = this.questions[this.currentQuestion];

        switch (currentQ.type) {
            case 'age':
                return await this.processAgeResponse(response);
            case 'voterId':
                return this.processVoterIdResponse(response);
            case 'state':
                return this.processStateResponse(response);
            case 'firstTime':
                return this.processFirstTimeResponse(response);
            default:
                return "I didn't understand that. Could you please try again?";
        }
    }

    /**
     * Process age response with eligibility check
     * @param {String} response
     * @returns {Promise<String>}
     */
    async processAgeResponse(response) {
        const age = parseInt(response);

        if (isNaN(age) || age < 1 || age > 130) {
            return "That doesn't seem like a valid age. Please enter a number between 1 and 130.";
        }

        this.userResponses.age = age;
        this.session.userProfile.age = age;
        this.currentQuestion++;

        // Check eligibility
        if (age < 18) {
            const msg = `You're ${age} years old. Great! While you can't vote yet, you can start pre-registering as an elector. In India, you can register as a voter as soon as you're 17 years and 6 months old.\n\n📋 What you need to do:\n1. Visit: https://electoralsearch.eci.gov.in/\n2. Select "Apply as a New Elector"\n3. Fill in your details\n4. Submit\n\nYou'll be registered once you turn 18. ${this.questions[this.currentQuestion].text}`;
            return msg;
        } else {
            return `Great! You're ${age} years old and eligible to vote! 🎉\n\n${this.questions[this.currentQuestion].text}`;
        }
    }

    /**
     * Process Voter ID response
     * @param {String} response
     * @returns {String}
     */
    processVoterIdResponse(response) {
        const lower = response.toLowerCase();
        let answer = null;

        if (lower.includes('yes')) {
            answer = 'Yes';
        } else if (lower.includes('no')) {
            answer = 'No';
        } else if (lower.includes('not') && lower.includes('sure')) {
            answer = 'Not Sure';
        }

        if (!answer) {
            return "I didn't understand that. Please answer with Yes, No, or Not Sure.";
        }

        this.userResponses.hasVoterId = answer;
        this.session.userProfile.hasVoterId = answer;
        this.currentQuestion++;

        let msg = '';
        if (answer === 'No') {
            msg = `No problem! Getting a Voter ID (also called EPIC - Elector's Photo Identity Card) is easy.\n\n📝 Here's how to apply:\n1. Online: https://electoralsearch.eci.gov.in → "Apply as New Elector"\n2. At Polling Station: Visit your nearest polling station\n3. Offline Form: Download form 7 from Election Commission website\n\nYou'll get your Voter ID within a few days to weeks.\n\n${this.questions[this.currentQuestion].text}`;
        } else if (answer === 'Not Sure') {
            msg = `You can check your voter status at: https://electoralsearch.eci.gov.in/\nSearch with your name and state.\n\n${this.questions[this.currentQuestion].text}`;
        } else {
            msg = `Excellent! Having your Voter ID ready makes the voting process smooth.\n\n${this.questions[this.currentQuestion].text}`;
        }

        return msg;
    }

    /**
     * Process state response
     * @param {String} response
     * @returns {String}
     */
    processStateResponse(response) {
        // Find matching state
        const state = this.findState(response);

        if (!state) {
            return `I couldn't find that state/UT. Please specify one of these:\n${STATES.map(s => s.name).join(', ')}\n\nTry again:`;
        }

        this.userResponses.state = state.code;
        this.session.userProfile.state = state.code;
        this.currentQuestion++;

        const msg = `Great! You're from ${state.name}.\n\n🏛️ ${state.name} Election Office:\nEmail: ${state.email}\nPhone: ${state.phone}\nWebsite: ${state.website}\n\n${this.questions[this.currentQuestion].text}`;
        return msg;
    }

    /**
     * Process first-time voter response
     * @param {String} response
     * @returns {String}
     */
    processFirstTimeResponse(response) {
        const lower = response.toLowerCase();
        let answer = null;

        if (lower.includes('yes')) {
            answer = 'Yes';
        } else if (lower.includes('no')) {
            answer = 'No';
        }

        if (!answer) {
            return "I didn't understand that. Please answer with Yes or No.";
        }

        this.userResponses.isFirstTime = answer;
        this.session.userProfile.isFirstTime = answer;
        this.currentQuestion = this.questions.length; // End of questions

        const msg = answer === 'Yes' 
            ? `Exciting! 🎉 Your first vote is a special moment. Don't worry, I'll guide you through everything!\n\nWould you like me to show you:\n1. "How to vote?" - Step-by-step voting process\n2. "Am I ready?" - Your readiness checklist\n3. Ask any specific question about voting`
            : `That's great! Your experience will come in handy. Is there anything specific you'd like to know or refresh about the voting process?`;

        saveSession(this.session);
        return msg;
    }

    /**
     * Find state by name or code
     * @param {String} query
     * @returns {Object|null}
     */
    findState(query) {
        const lower = query.toLowerCase().trim();
        return STATES.find(state => 
            state.name.toLowerCase().includes(lower) || 
            state.code.toLowerCase() === lower
        );
    }

    /**
     * Answer general questions using Gemini
     * @param {String} question
     * @returns {Promise<String>}
     */
    async answerWithGemini(question) {
        // Check cache first
        const cached = getCachedResponse(question);
        if (cached) {
            return cached;
        }

        // Build context
        const context = `User Age: ${this.userResponses.age}, Has Voter ID: ${this.userResponses.hasVoterId}, State: ${this.userResponses.state}, First-time: ${this.userResponses.isFirstTime}`;

        try {
            const answer = await answerElectionQuestion(question, context, this.session.language);
            cacheResponse(question, answer);
            return answer;
        } catch (error) {
            return handleApiError(error);
        }
    }

    /**
     * Answer specific election questions
     * @param {String} topic
     * @returns {Promise<String>}
     */
    async answerQuestion(topic) {
        if (!ELECTION_RESPONSES[topic.toLowerCase()]) {
            return await this.answerWithGemini(`What is ${topic} in Indian elections?`);
        }

        const response = ELECTION_RESPONSES[topic.toLowerCase()];
        return response.explanation || response.steps || response.guidance || 'Information not available.';
    }

    /**
     * Generate readiness checklist
     * @returns {String}
     */
    generateReadinessList() {
        const age = this.userResponses.age;
        const hasId = this.userResponses.hasVoterId;
        const state = this.userResponses.state;

        let checklist = "✅ Your Voting Readiness Checklist:\n\n";

        // Age check
        if (age < 18) {
            checklist += "❌ Age: Not eligible yet (need to be 18+)\n";
            checklist += "   → Pre-register now for when you turn 18\n";
        } else {
            checklist += "✅ Age: Eligible to vote\n";
        }

        // Voter ID check
        if (hasId === 'No' || hasId === 'Not Sure') {
            checklist += "❌ Voter ID: Need to register\n";
            checklist += "   → Apply at https://electoralsearch.eci.gov.in/\n";
        } else {
            checklist += "✅ Voter ID: You have one\n";
        }

        // Location check
        if (state) {
            const stateObj = STATES.find(s => s.code === state);
            checklist += `✅ Location: ${stateObj?.name || state}\n`;
        } else {
            checklist += "❌ Location: Need to confirm\n";
        }

        // Ready to vote
        if (age >= 18 && hasId === 'Yes' && state) {
            checklist += "\n🎉 You're ready to vote! Find your polling station and cast your vote!";
            this.session.readyToVote = true;
            saveSession(this.session);
        } else {
            checklist += "\n⏳ Complete the steps above to be ready.";
        }

        return checklist;
    }

    /**
     * Get next question in sequence
     * @returns {Object|null}
     */
    getNextQuestion() {
        if (this.currentQuestion < this.questions.length) {
            return this.questions[this.currentQuestion];
        }
        return null;
    }

    /**
     * Reset conversation
     */
    reset() {
        this.currentQuestion = 0;
        this.userResponses = {
            age: null,
            hasVoterId: null,
            state: null,
            isFirstTime: null
        };
        this.session = createSession();
        saveSession(this.session);
    }

    /**
     * Get current user profile
     * @returns {Object}
     */
    getUserProfile() {
        return this.session.userProfile;
    }

    /**
     * Set language preference
     * @param {String} lang - 'english' or 'hindi'
     */
    setLanguage(lang) {
        this.session.language = lang;
        saveSession(this.session);
    }

    /**
     * Log conversation turn
     * @param {String} userMessage
     * @param {String} assistantResponse
     */
    logMessage(userMessage, assistantResponse) {
        this.session.messages.push({
            id: generateId(),
            timestamp: new Date(),
            user: userMessage,
            assistant: assistantResponse
        });
        saveSession(this.session);
        logAnalytics('message_sent', { userLength: userMessage.length });
    }
}

// Create global assistant instance
const assistant = new ElectionAssistant();
