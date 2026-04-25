/**
 * ============================================================
 * Pre-defined Election Assistant Responses
 * ============================================================
 * Static responses for common questions and scenarios
 */

const ELECTION_RESPONSES = {
    nota: {
        explanation: `✅ NOTA - None of the Above

NOTA stands for "None of the Above". It's an option available to every voter in India.

📌 What it means:
If you don't approve of ANY candidate, you can choose NOTA instead of voting for a specific candidate.

🗳️ How to vote for NOTA:
1. Go to your polling station on voting day
2. Enter the voting booth
3. On the EVM (voting machine), NOTA is the LAST button
4. Press the NOTA button and your vote is recorded

❓ Important facts:
• NOTA votes are counted but don't affect results
• NOTA is NOT a "wasted vote" - it's a valid form of protest
• Introduced in India in 2013
• Your right to express dissatisfaction
• No candidate needs NOTA votes to win

💡 When to use NOTA:
- You don't like any candidate
- You want to protest against poor candidates
- To encourage quality candidates in future

Remember: Your vote is your voice! Whether you vote for a candidate or choose NOTA, it's your democratic right!`
    },

    evm: {
        explanation: `✅ Understanding EVM - Electronic Voting Machine

EVM is the voting machine used in Indian elections. It's simple, secure, and tamper-proof.

🖥️ Parts of EVM:
1. Ballot Unit: Where you press buttons to vote
2. Control Unit: Sthey election official presses to lock/unlock
3. VVPAT (Voter Verified Paper Audit Trail): Prints your vote on paper

🔒 Is EVM Safe?
YES! EVMs in India are:
• Built in India (not imported)
• Tested thoroughly before every election
• Sealed and guarded constantly
• Monitored during voting
• Have built-in safeguards against tampering
• Accuracy rate: 99.9%

🗳️ How to Vote on EVM:
1. Election official verifies your identity
2. You enter the voting booth
3. Close the booth curtain for privacy
4. Press the blue button next to your choice
5. Light blinks - your vote is recorded
6. VVPAT prints your choice (you can verify)
7. Your finger gets indelible ink mark

⚖️ Why EVM over paper ballots?
• Faster counting
• More accurate
• Reduces fraud
• Environmentally friendly
• Prevents multiple voting (with ink mark)

💡 Questions about accuracy?
Indian courts have tested and verified EVM security multiple times. Each vote is counted accurately!`
    },

    voterId: {
        explanation: `✅ Voter ID (EPIC) - Elector's Photo Identity Card

A Voter ID proves you're registered to vote in India.

📋 What is it?
- Official identity card issued by Election Commission
- Proves you're enrolled as a voter
- Has your photo, name, address, and voter ID number
- Valid throughout India
- Required for voting

🤔 Do I need Voter ID to vote?
NO! You can vote even without Voter ID:
- Use any government photo ID (Aadhar, Passport, Driving License, PAN)
- Election officials can recognize you verbally
- But Voter ID makes the process faster

📝 How to get Voter ID:

ONLINE (Easiest):
1. Visit: https://electoralsearch.eci.gov.in/
2. Click "Apply as New Elector"
3. Fill Form 6 with your details
4. Upload photo and identity proof
5. Submit
6. Get your Voter ID in 7-10 days

OFFLINE:
1. Get Form 7 from polling station or election office
2. Fill it with your details
3. Attach photo and proof of residence
4. Submit at local polling station
5. Get confirmation slip
6. Voter ID issued after verification

📄 Documents needed:
• Photo: Latest passport-size color photo
• Identity proof: Aadhar, PAN, DL, Passport
• Residence proof: Electricity bill, Rental agreement, Ration card

⏱️ Time to get Voter ID:
- Offline: 5-7 days
- Online: 7-10 days
- In emergencies: 2-3 days

👉 Next step: Apply now! Don't wait until election time!`
    },

    registration: {
        steps: `📝 How to Register as a Voter in India

Registration is FREE and SIMPLE!

🌐 OPTION 1: Online Registration (Recommended)

Step 1: Visit the website
→ https://electoralsearch.eci.gov.in/

Step 2: Find the application section
→ Look for "Apply as New Elector"

Step 3: Fill Form 6
→ Name
→ Date of Birth
→ Father/Husband name
→ Current address
→ Email and phone number

Step 4: Upload documents
→ Recent color passport photo
→ Photo ID (Aadhar, DL, etc.)
→ Proof of residence (optional)

Step 5: Submit
→ Get your Form submission number
→ Check status using this number

Step 6: Verification
→ Election officials verify your details

Step 7: Get Voter ID
→ Voter ID sent to your address (7-10 days)

---

📍 OPTION 2: Offline Registration

Step 1: Get Form 7
→ Visit your local polling station
→ Ask for "Form 7 - Application for New Elector"
→ Or download from ECI website

Step 2: Fill the form
→ All details as per your ID
→ Get it signed by any witness

Step 3: Attach documents
→ Photo copy of photo ID
→ Photo copy of residence proof (optional)
→ Recent color photograph

Step 4: Submit
→ Submit at polling station
→ Get a receipt with application number

Step 5: Follow up
→ Check status after 5-7 days online
→ Or visit election office

Step 6: Get Voter ID
→ ID card sent to your registered address

---

⏱️ Timeline:
• Application: Instant (online) or 1 day (offline)
• Verification: 3-5 days
• Voter ID issuance: 5-10 days

✅ Tips:
1. Register as early as possible
2. Update address if you've moved
3. Keep your submission number safe
4. Check status regularly online
5. Contact election office if ID doesn't arrive

📞 Contact:
Voter Helpline: 1950 (toll-free in India)
Election Commission: https://eci.gov.in`
    },

    firstTimeVoter: {
        guidance: `🎉 Welcome, First-Time Voters!

This is an important milestone in your life. Here's your complete guide:

✅ BEFORE VOTING DAY

1. Check if you're registered
   → Visit: https://electoralsearch.eci.gov.in/
   → Search your name and state
   → You should see your name in electoral roll

2. Get a Voter ID (optional but helpful)
   → Makes voting faster
   → Apply online or offline
   → Takes 7-10 days

3. Know your polling station
   → Search on electoral website
   → Note the address and location
   → Location might be a school or community center

4. Arrange your documents
   → Voter ID (EPIC) - preferred
   → OR any photo ID (Aadhar, PAN, DL, Passport)
   → Bring both if available

5. Plan your timing
   → Voting is 7 AM to 6 PM
   → Come early to avoid long queues
   → It takes 5-15 minutes to vote

---

🗳️ ON VOTING DAY

Step 1: Reach polling station
   → Go early (no penalties for early arrival!)
   → Bring your ID

Step 2: Enter and report your name
   → Election official checks your name
   → They verify your identity
   → You'll get your finger marked with special ink

Step 3: Go to voting booth
   → Election official gives you entry
   → Curtain provides privacy
   → Take time to make your choice

Step 4: Vote carefully
   → Locate your chosen candidate/party on EVM
   → Press the blue button next to your choice
   → Wait for light to blink
   → Your vote is locked in!

Step 5: Cast your vote
   → Election official locks the booth
   → Officially announce your vote is cast
   → Get your indelible ink mark

Step 6: Leave
   → Your duty is done!
   → Don't forget - ink mark should be visible!

---

📌 IMPORTANT POINTS FOR FIRST-TIMERS

✓ You CANNOT vote twice
✓ Voting is SECRET - no one knows your choice
✓ You're not required to vote (but it's your right)
✓ Candidates cannot campaign inside polling station
✓ Alcohol is prohibited on voting day
✓ No photography/videos allowed inside booth
✓ If you make a mistake, ask for replacement EVM card
✓ NOTA option is available if you don't like any candidate

---

💡 TIPS TO MAKE IT SMOOTH

1. Wear comfortable clothes
2. Come early to avoid crowds
3. Bring water bottle
4. Keep an umbrella/sunscreen
5. Have ID ready
6. Don't believe rumors about voting
7. Ask election officials if confused
8. Vote with confidence!

---

🌟 WHY YOUR FIRST VOTE MATTERS

Your vote is your voice! In a democracy:
• Every vote counts equally
• Your choice influences the future
• Even if your candidate loses, your vote was counted
• Regular voting strengthens democracy

Remember: You're joining millions of Indian voters exercising their democratic right. This is just the beginning of your civic participation!

Good luck! 🇮🇳`
    },

    eligibility: {
        info: `✅ Are You Eligible to Vote?

Check if you meet the requirements to vote in India!

📋 BASIC REQUIREMENTS

Age: Must be 18 years or older ✓
Citizenship: Must be Indian citizen ✓
Residency: Must be enrolled in electoral roll ✓
Not disqualified: See below

---

❌ YOU CANNOT VOTE IF:

1. Age below 18 years
   → But you can pre-register from 17.5 years!

2. Not an Indian citizen
   → Must have Indian citizenship

3. Not resident of constituency for 6+ months
   → Must have permanent residence there

4. Declared "not of sound mind"
   → By court of law

5. Guilty of certain electoral offences
   → Previous conviction for electoral fraud

6. Non-resident Indian (NRI)
   → Cannot vote from abroad
   → Can vote if physically present in India

7. Already registered twice
   → Can only enroll once

---

🎓 SPECIAL CASES

First-time Voters (17.5 - 18 years):
→ Can pre-register online
→ Will be added to electoral roll on 18th birthday
→ Automatically eligible to vote

People who moved:
→ Update your name in NEW constituency
→ Take 3-5 days for transfer
→ You can vote only in new constituency

Non-resident Indians (NRI):
→ Can vote only if physically in India
→ Use postal ballot system
→ Apply at election office

Persons with disabilities:
→ Can request persons with disabilities to help
→ Can vote from home (if mobility issues)
→ Contact election office for assistance

---

✅ IF YOU'RE ELIGIBLE:

1. Register as a voter
   → Visit: https://electoralsearch.eci.gov.in/
   → Fill Form 6 online or offline
   → Get your Voter ID

2. Check your enrollment
   → Search electoral roll
   → You should be listed

3. Vote on election day
   → Go to polling station
   → Bring valid ID
   → Cast your vote!

---

🤔 NOT SURE IF YOU'RE ELIGIBLE?

1. Visit electoral website: https://electoralsearch.eci.gov.in/
2. Search with your name and state
3. Contact your state election commission
4. Call Voter Helpline: 1950 (toll-free)
5. Visit local polling station

✉️ Contact your state:
[See state contact info in sidebar]

---

🚀 NEXT STEPS

Eligible? → Register immediately → Vote on election day!

Your vote is your right. Make sure you exercise it! 🇮🇳`
    },

    votingProcess: {
        steps: `🗳️ Complete Guide: How to Vote in Indian Elections

Follow these simple steps to cast your vote:

---

📍 STEP 1: REACH YOUR POLLING STATION

When to go:
• Voting time: 7:00 AM to 6:00 PM
• Arrive early to avoid crowds
• No problem if you reach before 7 AM

Where to go:
• Find your polling station at: https://electoralsearch.eci.gov.in/
• Usually at schools, community centers, or government offices
• One polling station per 1250 voters maximum

What to bring:
• Voter ID (EPIC) - preferred
• Any government photo ID (Aadhar, DL, PAN, Passport)
• At least one ID is mandatory

---

🏟️ STEP 2: ENTER POLLING STATION

1. Stand in line
2. Look for your name in voter list
3. Election official will call out your details
4. Verify your name, address, and age
5. You'll receive a "Yes" if everything matches

---

🖐️ STEP 3: GET INDELIBLE INK MARK

Election official will:
• Mark your left index finger (or right if left is injured)
• Use indelible ink (doesn't wash off for 24-48 hours)
• This prevents double voting
• Keep your hand visible!

---

🎟️ STEP 4: GET EVM SLIP/CARD TOKEN

Election official will:
• Check if any other marking on your finger
• Give you a token/serial number slip
• This proves you haven't voted already

---

🔒 STEP 5: ENTER VOTING BOOTH

1. Election official will escort you
2. Look for and enter the empty booth
3. Close the curtain for complete privacy
4. You now have time to select your choice
5. Don't rush - take your time!

---

🖲️ STEP 6: VOTE ON EVM (Electronic Voting Machine)

EVM has three parts visible to you:

Part 1: BALLOT UNIT
• Shows all candidates and parties
• Has blue buttons next to each candidate
• Large symbols for party identification

Part 2: VOTING PROCEDURE
• Find the candidate/party you want to vote for
• Press the BLUE BUTTON next to their name
• Wait for the LIGHT TO BLINK and BEEP SOUND
• This confirms your vote is recorded!

Part 3: VVPAT (Voter Verified Paper Audit Trail)
• After you vote, a paper slip comes out
• Shows your choice name/symbol for 7 seconds
• You can verify if your choice was recorded correctly
• Paper slip goes back in (not taken by you)

Special option: NOTA
• Last button on the EVM
• "NOTA" = None of the Above
• Vote here if you don't approve any candidate
• It's a valid vote in democracy!

---

✅ STEP 7: CONFIRM YOUR VOTE

1. Check VVPAT display carefully
2. Verify that correct candidate/party is shown
3. If WRONG: Immediately call election official
   → They will give you a replacement EVM card
   → You can vote again (only 1 vote counts)
4. If CORRECT: Wait for 7 seconds
   → Paper automatically goes back
   → Your vote is finalized!

---

🚪 STEP 8: EXIT VOTING BOOTH

1. Election official will unlock the booth
2. Show your indelible ink mark to confirm
3. Submit your EVM card/slip
4. You've successfully voted! 🎉

---

⏱️ TOTAL TIME: 5-15 minutes

What affects time:
• Crowd at polling station
• How quick you decide
• Number of candidates in your constituency

---

❓ COMMON QUESTIONS

Q: What if I accidentally vote for wrong candidate?
A: Call election official immediately. They'll give you a new EVM card. Only your first vote was recorded, previous one is discarded.

Q: What if I don't know any candidate?
A: Election officials will recite candidate names. You can ask for name clarification before voting.

Q: Can I take a selfie while voting?
A: NO! Photography is strictly prohibited inside polling station and booth.

Q: Can someone help me vote?
A: Yes! If you're blind or have mobility issues, any person of your choice (not election official) can accompany you.

Q: What if my name is NOT in the voter list?
A: Contact election official on the spot. They may allow you to vote on your identity. Or apply for grievance redressal.

Q: Can I vote if I'm menstruating?
A: YES! There's no restriction. It's a myth. Vote with confidence!

Q: What if I have to leave town on voting day?
A: Apply for Postal Ballot. Request at least 5 days before voting. Contact your election office.

Q: Do I have to vote?
A: Voting is VOLUNTARY. You're not forced. But it's your democratic right - exercise it!

---

🎯 TIPS FOR SMOOTH VOTING

1. Vote early (morning is less crowded)
2. Bring both IDs if possible
3. Be clear about your choice before entering booth
4. Take time to verify VVPAT display
5. Ask election officials if confused
6. Vote with confidence!
7. Keep your ink mark visible as proof

---

Your vote matters! Make your voice heard! 🇮🇳`
    }
};
