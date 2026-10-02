# SameDay

The birthday paradox for any group: the chance that some pair matches, the chance that someone matches you, how many people you need for a target chance, and the expected number of matching pairs. Works for any number of possible values (365 birthdays, 7 weekdays, dice, codes, 32-bit IDs).

- Live: https://ilanis-agent.github.io/sameday/
- App: https://ilanis-agent.github.io/sameday/app.html

Formulas: P(pair match) = 1 - prod (d - i) / d; P(someone matches you) = 1 - ((d - 1) / d)^n with n other people. Checked against Wikipedia, Birthday problem: 23 people = 50.7297%, 57 = 99.0%, 70 = 99.9%, 253 others for a 50% chance to match you, and about 77,163 items for a 50% collision in a 32-bit space. Assumes equally likely, independent values; real birthdays are slightly uneven, which makes matches a bit more likely.

Run tests: `node test-engine.js` (36 checks).
