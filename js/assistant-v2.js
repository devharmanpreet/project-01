/**
 * Product-grade assistant logic for VoteReady India.
 * Keeps decisioning deterministic and action-oriented.
 */
class ElectionAssistantV2 {
    constructor() {
        this.session = getOrCreateSession();
        this.profile = { ...this.session.userProfile };
        this.language = this.session.language || 'english';
    }

    setLanguage(lang) {
        this.language = lang;
        this.session.language = lang;
        saveSession(this.session);
    }

    getUserProfile() {
        return this.profile;
    }

    getJourneyStep() {
        if (!this.profile.age) return 1;
        if (!this.profile.hasVoterId || !this.profile.state) return 2;
        return 3;
    }

    getQuickReplies() {
        const step = this.getJourneyStep();
        if (step === 1) {
            return ['I am 19', 'I am 17', 'How to check eligibility?'];
        }
        if (step === 2) {
            return ['I do not have voter ID', 'How to register online?', 'My name is missing in voter list'];
        }
        return ['How does EVM work?', 'What is NOTA?', 'Give my final checklist'];
    }

    async handleMessage(userMessage) {
        const message = userMessage.trim();
        const lower = message.toLowerCase();
        const parsed = parseMessage(message);

        const maybeAge = this.extractAge(lower);
        if (maybeAge) {
            this.profile.age = maybeAge;
            this.session.userProfile.age = maybeAge;
            saveSession(this.session);
            return this.buildAgeResponse(maybeAge);
        }

        const voterId = this.extractVoterIdStatus(lower);
        if (voterId) {
            this.profile.hasVoterId = voterId;
            this.session.userProfile.hasVoterId = voterId;
            saveSession(this.session);
            return this.buildVoterIdResponse(voterId);
        }

        const state = this.findState(message);
        if (state) {
            this.profile.state = state.code;
            this.session.userProfile.state = state.code;
            saveSession(this.session);
            return this.buildStateResponse(state);
        }

        if (lower.includes('first time') || lower.includes('pehli baar')) {
            this.profile.isFirstTime = 'Yes';
            this.session.userProfile.isFirstTime = 'Yes';
            saveSession(this.session);
            return this.withFollowUp(
                this.t(
                    'Perfect. As a first-time voter, I will keep steps simple and practical.',
                    'Great! First vote hai, main steps simple rakhunga.'
                ),
                this.t('Do you already have voter ID?', 'Kya aapke paas voter ID hai?')
            );
        }

        if (parsed.detected.ready || lower.includes('checklist')) {
            return this.generateFinalChecklist();
        }

        if (parsed.detected.evm) return this.explainEvmSimple();
        if (parsed.detected.nota) return this.explainNotaSimple();
        if (parsed.detected.registration) return this.registrationPlaybook();
        if (parsed.detected.polling) return this.pollingDayPlaybook();
        if (parsed.detected.eligibility) return this.eligibilityPlaybook();

        const contextual = await this.askGeminiContextually(message);
        return this.withFollowUp(contextual, this.nextQuestionPrompt());
    }

    extractAge(lower) {
        const m = lower.match(/\b(\d{1,3})\b/);
        if (!m) return null;
        const age = Number(m[1]);
        return age >= 1 && age <= 120 ? age : null;
    }

    extractVoterIdStatus(lower) {
        const hasYes = /\b(yes|haan|ha|h)\b/.test(lower) || lower.includes('have voter');
        const hasNo = /\b(no|nahi|nahin)\b/.test(lower) || lower.includes("don't have") || lower.includes('do not have');
        const unsure = lower.includes('not sure') || lower.includes('pata nahi');
        if (unsure) return 'Not Sure';
        if (hasNo) return 'No';
        if (hasYes) return 'Yes';
        return null;
    }

    findState(input) {
        const q = input.toLowerCase().trim();
        return STATES.find((s) => s.name.toLowerCase() === q || s.code.toLowerCase() === q || q.includes(s.name.toLowerCase()));
    }

    buildAgeResponse(age) {
        if (age < 18) {
            return this.withFollowUp(
                this.t(
                    `You are ${age}. You cannot vote yet, but you can prepare now.\n\nAction plan:\n1) Keep DOB proof ready\n2) Visit https://electoralsearch.eci.gov.in/\n3) Start registration once eligible`,
                    `Aap ${age} ke ho. Abhi vote nahi kar sakte, par preparation start kar sakte ho.\n\nAction plan:\n1) DOB proof ready rakho\n2) https://electoralsearch.eci.gov.in/ open karo\n3) Eligible hote hi registration karo`
                ),
                this.t('Which state do you live in?', 'Aap kis state mein rehte ho?')
            );
        }
        return this.withFollowUp(
            this.t(
                `Great - age ${age} means you are eligible to vote in India.\n\nNext smart step: confirm voter list status and voter ID.`,
                `Badhiya - age ${age} ka matlab aap India mein vote ke liye eligible ho.\n\nNext step: voter list status aur voter ID confirm karte hain.`
            ),
            this.t('Do you have a voter ID (Yes / No / Not sure)?', 'Kya voter ID hai? (Yes / No / Not sure)')
        );
    }

    buildVoterIdResponse(status) {
        if (status === 'Yes') {
            return this.withFollowUp(
                this.t(
                    'Excellent. Keep your EPIC details handy. You can also carry any valid photo ID on polling day.',
                    'Badiya. EPIC details handy rakho. Polling day par valid photo ID bhi chalega.'
                ),
                this.t('Tell me your state so I can give local election office details.', 'Apna state batao, main local election office details dunga.')
            );
        }
        if (status === 'Not Sure') {
            return this.withFollowUp(
                this.t(
                    'No worries. Verify your name in electoral roll first: https://electoralsearch.eci.gov.in/',
                    'Tension mat lo. Pehle electoral roll mein naam verify karo: https://electoralsearch.eci.gov.in/'
                ),
                this.t('Share your state, I will give exact next steps.', 'Apna state bhejo, exact next steps deta hoon.')
            );
        }
        return this.withFollowUp(this.registrationPlaybook(), this.t('Now share your state for state-level contacts.', 'Ab state batao state-level contacts ke liye.'));
    }

    buildStateResponse(state) {
        const body = this.t(
            `Got it: ${state.name}.\n\nLocal support:\n- Website: ${state.website}\n- Email: ${state.email}\n- Phone: ${state.phone}\n\nUse these if registration or roll correction is delayed.`,
            `State set: ${state.name}.\n\nLocal support:\n- Website: ${state.website}\n- Email: ${state.email}\n- Phone: ${state.phone}\n\nAgar registration/roll correction mein issue aaye to inhe contact karo.`
        );
        return this.withFollowUp(body, this.t('Want a polling-day checklist now?', 'Polling day checklist chahiye?'));
    }

    eligibilityPlaybook() {
        return this.withFollowUp(
            this.t(
                'Eligibility in India: 18+ age, Indian citizen, and name in electoral roll.\nAction: Check roll first, then register/correct details if missing.',
                'Eligibility: age 18+, Indian citizen, aur electoral roll mein naam.\nAction: Pehle roll check karo, naam missing ho to register/correct karo.'
            ),
            this.nextQuestionPrompt()
        );
    }

    registrationPlaybook() {
        return this.t(
            'Registration fast-track:\n1) Open https://electoralsearch.eci.gov.in/\n2) Select new elector registration\n3) Upload photo + identity + address proof\n4) Save reference number\n5) Track status every few days\n\nIf urgent, call helpline 1950.',
            'Registration fast-track:\n1) https://electoralsearch.eci.gov.in/ open karo\n2) New elector registration select karo\n3) Photo + identity + address proof upload karo\n4) Reference number save karo\n5) Har kuch din baad status track karo\n\nUrgent ho to 1950 par call karo.'
        );
    }

    pollingDayPlaybook() {
        return this.t(
            'Polling day in 5 steps:\n1) Reach assigned booth early\n2) Identity verification + ink mark\n3) Enter EVM booth privately\n4) Press candidate/NOTA button\n5) Verify VVPAT slip for few seconds\n\nCarry any valid government photo ID.',
            'Polling day 5 steps:\n1) Assigned booth par jaldi pahucho\n2) Identity verification + ink mark\n3) EVM booth mein private vote karo\n4) Candidate/NOTA button press karo\n5) VVPAT slip verify karo\n\nValid government photo ID zarur le jao.'
        );
    }

    explainEvmSimple() {
        return this.withFollowUp(
            this.t(
                'EVM is a digital voting machine. You press one button for your candidate, then VVPAT shows a short paper preview so you can verify your vote.',
                'EVM digital voting machine hoti hai. Aap candidate ke saamne button press karte ho, phir VVPAT slip short time ke liye dikhti hai jisse vote verify ho jata hai.'
            ),
            this.t('Want a booth-by-booth walkthrough?', 'Booth pe exact kya hota hai, woh walkthrough chahiye?')
        );
    }

    explainNotaSimple() {
        return this.withFollowUp(
            this.t(
                'NOTA means "None of the Above". Use it when you do not want to choose any listed candidate. It is available as the last option on EVM.',
                'NOTA ka matlab "None of the Above". Jab koi candidate choose nahi karna ho tab use karo. EVM par yeh last option hota hai.'
            ),
            this.t('Need help deciding when to use NOTA?', 'NOTA kab use karna chahiye, uska quick guide chahiye?')
        );
    }

    generateFinalChecklist() {
        const stateObj = STATES.find((s) => s.code === this.profile.state);
        const checks = [
            `${this.profile.age >= 18 ? '✅' : '❌'} Age eligibility (${this.profile.age || 'Not provided'})`,
            `${this.profile.hasVoterId === 'Yes' ? '✅' : '⚠️'} Voter ID status (${this.profile.hasVoterId || 'Unknown'})`,
            `${stateObj ? '✅' : '⚠️'} State details (${stateObj ? stateObj.name : 'Not provided'})`
        ];

        let nextAction;
        if (!this.profile.age || this.profile.age < 18) {
            nextAction = this.t('Next action: keep documents ready and revisit once you are 18.', 'Next action: documents ready rakho aur 18 hote hi revisit karo.');
        } else if (this.profile.hasVoterId !== 'Yes') {
            nextAction = this.t('Next action: complete voter registration today.', 'Next action: aaj hi voter registration complete karo.');
        } else {
            nextAction = this.t('Next action: verify polling station and carry valid ID on voting day.', 'Next action: polling station verify karo aur voting day par valid ID le jao.');
        }

        return `${this.t('Your vote readiness snapshot:', 'Aapka vote readiness snapshot:')}\n${checks.join('\n')}\n\n${nextAction}`;
    }

    nextQuestionPrompt() {
        const step = this.getJourneyStep();
        if (step === 1) {
            return this.t('Tell me your age to start personalization.', 'Personalization start karne ke liye age batao.');
        }
        if (step === 2) {
            return this.t('Tell me voter ID status and state, then I will give exact plan.', 'Voter ID status aur state batao, fir exact plan dunga.');
        }
        return this.t('Ask me about EVM, NOTA, or your final checklist.', 'EVM, NOTA, ya final checklist ke baare mein pucho.');
    }

    async askGeminiContextually(question) {
        const context = `User profile => age:${this.profile.age}, voterId:${this.profile.hasVoterId}, state:${this.profile.state}, firstTime:${this.profile.isFirstTime}`;
        try {
            return await answerElectionQuestion(question, context, this.language);
        } catch (error) {
            return this.t(
                'I could not fetch AI response right now, but I can still guide you with exact election steps.',
                'Abhi AI response fetch nahi ho pa raha, par main aapko exact election steps de sakta hoon.'
            );
        }
    }

    withFollowUp(mainText, followUp) {
        return `${mainText}\n\n${this.t('Next best step:', 'Next best step:')} ${followUp}`;
    }

    t(en, hi) {
        return this.language === 'hindi' ? hi : en;
    }

    logMessage(userMessage, assistantResponse) {
        this.session.messages.push({
            id: generateId(),
            timestamp: new Date().toISOString(),
            user: userMessage,
            assistant: assistantResponse
        });
        saveSession(this.session);
        logAnalytics('message_sent', { userLength: userMessage.length });
    }
}

const assistant = new ElectionAssistantV2();
