/**
 * Validation and input-safety helpers.
 * Keeps user text safe, bounded, and predictable.
 */
const INPUT_RULES = {
    maxMessageLength: 300,
    // Age validation: strict 0–120 range as required.
    minAge: 0,
    maxAge: 120
};

function sanitizeUserInput(value) {
    if (typeof value !== 'string') return '';
    return value.replace(/\s+/g, ' ').trim();
}

function validateMessageInput(rawValue) {
    const sanitized = sanitizeUserInput(rawValue);
    if (!sanitized) {
        return { ok: false, reason: 'empty', value: '' };
    }
    if (sanitized.length > INPUT_RULES.maxMessageLength) {
        return {
            ok: false,
            reason: 'too_long',
            value: sanitized.slice(0, INPUT_RULES.maxMessageLength)
        };
    }
    return { ok: true, reason: null, value: sanitized };
}

function extractAndValidateAge(text) {
    if (typeof text !== 'string') return { ok: false, age: null };
    const match = text.toLowerCase().match(/\b(\d{1,3})\b/);
    if (!match) return { ok: false, age: null };

    const age = Number(match[1]);
    if (age < INPUT_RULES.minAge || age > INPUT_RULES.maxAge) {
        return { ok: false, age: null };
    }
    return { ok: true, age };
}
