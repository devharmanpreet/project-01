/**
 * Lightweight smoke tests for core validation and assistant stability.
 * Run in browser console: runSmokeTests()
 */
function runSmokeTests() {
    const tests = [];

    // Validation tests
    tests.push({
        name: 'Empty message should fail',
        pass: validateMessageInput('   ').ok === false
    });

    tests.push({
        name: 'Valid message should pass',
        pass: validateMessageInput('How to register online?').ok === true
    });

    tests.push({
        name: 'Invalid age should fail',
        pass: extractAndValidateAge('I am 999').ok === false
    });

    tests.push({
        name: 'Valid age should pass',
        pass: extractAndValidateAge('I am 19').ok === true
    });

    // Assistant stability tests
    tests.push({
        name: 'Greeting should return text',
        pass: typeof assistant.handleMessage === 'function'
    });

    const failed = tests.filter((t) => !t.pass);
    console.table(tests);
    if (failed.length) {
        console.warn(`Smoke tests: ${failed.length} failed`);
    } else {
        console.info('Smoke tests: all passed');
    }
    return { total: tests.length, failed: failed.length };
}
