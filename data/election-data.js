/**
 * ============================================================
 * Election Information and Data
 * ============================================================
 * Key election facts, dates, and procedural information
 */

const ELECTION_INFO = {
    eligibility: {
        minAge: 18,
        citizenship: 'Indian citizen',
        residency: 'Enrolled in the electoral roll of the constituency',
        disqualifications: [
            'Non-citizen',
            'Unsound mind',
            'Guilty of certain offences',
            'Not meeting residency requirements'
        ]
    },
    votingProcess: {
        steps: [
            'Reach the polling station on voting day',
            'Report your name and get verified',
            'Receive your ballot/EVM card',
            'Mark your vote in the voting booth',
            'Register your vote',
            'Receive indelible ink mark on your finger'
        ],
        timeLimit: '7 AM to 6 PM',
        documentsNeeded: [
            'Voter ID (EPIC)',
            'Any photo ID (Aadhar, PAN, Driving License, Passport)',
            'No document needed (verbal identification allowed)'
        ]
    },
    nota: {
        fullName: 'None of the Above',
        abbreviation: 'NOTA',
        year: '2013',
        eligibility: 'Any voter can vote for NOTA',
        purpose: 'Expresses disapproval of candidates',
        howTo: 'Select NOTA button on EVM (last option)'
    },
    evm: {
        fullName: 'Electronic Voting Machine',
        introduced: '1998',
        accuracy: '99.9%',
        tampering: 'Highly secure against tampering',
        features: [
            'Ballot Unit (for recording votes)',
            'Control Unit (operated by election officials)',
            'VVPATs (Voter Verified Paper Audit Trail)',
            'Serial number for authentication'
        ]
    },
    timeline: {
        general: new Date('2026-06-15'),
        registrationDeadline: new Date('2026-05-15'),
        campaignStart: new Date('2026-05-20'),
        campaignEnd: new Date('2026-06-05'),
        pollingStart: new Date('2026-06-05'),
        pollingEnd: new Date('2026-06-10'),
        resultDate: new Date('2026-06-25')
    },
    registrationModes: [
        {
            mode: 'Online',
            url: 'https://electoralsearch.eci.gov.in/',
            time: 'Anytime, 24/7',
            documents: 'Digital copies'
        },
        {
            mode: 'Offline (Form 7)',
            location: 'Polling Station / Election Office',
            time: 'During office hours',
            documents: 'Photo ID + Proof of residence'
        },
        {
            mode: 'Contact Election Official',
            location: 'State Election Commission',
            method: 'Phone / Visit / Portal'
        }
    ],
    constitutionalBasis: [
        'Part 16 of Indian Constitution',
        'Representation of the People Act, 1951',
        'Election Commission of India (ECI) Guidelines'
    ],
    voterRights: [
        'Right to vote (if eligible)',
        'Right to know about candidates',
        'Right to request recount',
        'Right to grievance redressal',
        'Right to vote by postal ballot (if authorized)'
    ]
};

// Key dates and milestones
const ELECTION_TIMELINE = [
    {
        date: '2026-05-01',
        event: 'Voter Registration Campaign Begins',
        description: 'Mass awareness and registration drives start across states'
    },
    {
        date: '2026-05-15',
        event: 'Registration Deadline',
        description: 'Last date to register as a voter for upcoming elections'
    },
    {
        date: '2026-05-20',
        event: 'Campaign Period Begins',
        description: 'Parties and candidates start formal campaigning'
    },
    {
        date: '2026-06-05',
        event: 'Campaign Ends',
        description: 'Last day of campaigning (48 hours before polling)'
    },
    {
        date: '2026-06-05',
        event: 'Polling Begins',
        description: 'Voting starts across India for General Elections'
    },
    {
        date: '2026-06-10',
        event: 'Polling Ends',
        description: 'Last phase of voting concludes'
    },
    {
        date: '2026-06-15',
        event: 'Vote Counting',
        description: 'Electronic and physical votes are counted'
    },
    {
        date: '2026-06-25',
        event: 'Results Declaration',
        description: 'Counting complete and results officially announced'
    }
];

// Sample polling station data (mock)
const SAMPLE_POLLING_STATIONS = [
    {
        id: 'PS-001',
        state: 'DL',
        name: 'Government Senior Secondary School, Sector 8',
        address: 'Sector 8, New Delhi',
        booths: 5,
        officer: 'Shri Raj Kumar',
        phone: '9876543210'
    },
    {
        id: 'PS-002',
        state: 'MH',
        name: 'Municipal Corporation School, Andheri',
        address: 'Andheri, Mumbai, Maharashtra',
        booths: 6,
        officer: 'Dr. Priya Singh',
        phone: '9876543211'
    },
    {
        id: 'PS-003',
        state: 'KA',
        name: 'Government Primary School, Whitefield',
        address: 'Whitefield, Bangalore, Karnataka',
        booths: 4,
        officer: 'Smt. Lakshmi',
        phone: '9876543212'
    },
    {
        id: 'PS-004',
        state: 'TN',
        name: 'Municipal School, Anna Nagar',
        address: 'Anna Nagar, Chennai, Tamil Nadu',
        booths: 5,
        officer: 'Shri Kamalesh',
        phone: '9876543213'
    },
    {
        id: 'PS-005',
        state: 'WB',
        name: 'Government School, Kolkata',
        address: 'Kolkata, West Bengal',
        booths: 5,
        officer: 'Smt. Anjali Roy',
        phone: '9876543214'
    }
];

// FAQ data
const FAQS = [
    {
        question: 'What is the minimum age to vote in India?',
        answer: '18 years. You must be a citizen of India and enrolled in the electoral roll.'
    },
    {
        question: 'How do I register as a voter?',
        answer: 'Visit https://electoralsearch.eci.gov.in/ and fill Form 6. You can also apply offline at your local polling station.'
    },
    {
        question: 'What documents do I need to vote?',
        answer: 'Voter ID (EPIC) is ideal, but any government-issued photo ID works. If you don\'t have ID, election officials can recognize you.'
    },
    {
        question: 'Can I vote if I\'m away from my constituency?',
        answer: 'Yes, via postal ballot. Apply at least 5 days before polling day.'
    },
    {
        question: 'What is EVM and is it safe?',
        answer: 'EVM (Electronic Voting Machine) records votes electronically. It\'s highly secure with multiple safeguards and VVPATs for verification.'
    },
    {
        question: 'What is NOTA?',
        answer: 'NOTA (None of the Above) allows you to vote even if you don\'t approve of any candidate. It\'s the last option on the EVM.'
    },
    {
        question: 'How do I find my polling station?',
        answer: 'Visit the Electoral Search portal: https://electoralsearch.eci.gov.in/ and search with your name and state.'
    },
    {
        question: 'Can I vote more than once?',
        answer: 'No. You get the indelible ink mark after voting which prevents double voting.'
    }
];
