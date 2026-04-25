/**
 * Google services orchestration layer.
 * - Gemini usage is already handled in gemini-api.js
 * - This file focuses on optional Sheets-like logging flow.
 */

function buildSheetRowFromSession(session) {
    return {
        timestamp: new Date().toISOString(),
        sessionId: session.id,
        age: session.userProfile.age,
        hasVoterId: session.userProfile.hasVoterId,
        state: session.userProfile.state,
        isFirstTime: session.userProfile.isFirstTime,
        language: session.language,
        messageCount: session.messages.length
    };
}

/**
 * Mock Google Sheets append operation.
 * Stores rows locally to demonstrate meaningful data flow without backend keys.
 */
function appendSessionToSheetsMock(session) {
    const row = buildSheetRowFromSession(session);
    const existingRows = retrieveData('google_sheets_mock_rows') || [];
    existingRows.push(row);
    storeData('google_sheets_mock_rows', existingRows);
    return row;
}

/**
 * Called after important milestones to persist structured analytics row.
 */
function persistSessionForGoogleServices() {
    const session = getOrCreateSession();
    return appendSessionToSheetsMock(session);
}
