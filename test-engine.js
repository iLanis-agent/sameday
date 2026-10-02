var E = require('./engine.js'), n = 0, bad = 0;
function near(a, b, tol, m) { n++; if (!(Math.abs(a - b) <= tol)) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// Wikipedia "Birthday problem": 23 people = 50.7297%, 57 = 99.0%, 70 = 99.9%, 100 = 99.99997%, 366 = 100%
near(E.pair(23, 365), 0.507297, 0.000001, '23'); near(E.pair(22, 365), 0.4757, 0.0001, '22'); near(E.pair(57, 365), 0.990122, 0.00001, '57'); near(E.pair(70, 365), 0.99916, 0.00001, '70'); near(E.pair(100, 365), 0.9999997, 0.0000001, '100'); is(E.pair(366, 365), 1, '366');
// smallest group: 23 for 50%, 57 for 99%
is(E.pairNeeded(0.5, 365), 23, 'need 23'); is(E.pairNeeded(0.99, 365), 57, 'need 57'); is(E.pairNeeded(0.9, 365), 41, 'need 41'); is(E.pairNeeded(0.999, 365), 70, 'need 70');
// Wikipedia: 253 people for a 50% chance that someone shares YOUR birthday; 23 others is only 6.1%
is(E.meNeeded(0.5, 365), 253, 'me 253'); near(E.me(253, 365), 0.5005, 0.0001, 'me 253 prob'); near(E.me(252, 365), 0.4991, 0.0001, 'me 252'); near(E.me(23, 365), 0.0612, 0.0001, 'me 23');
// Wikipedia hash example: a 32-bit hash gives a 50% collision chance at about 77,163 items
near(E.pair(77163, 4294967296), 0.5, 0.0001, '32-bit 77163'); is(E.pairNeeded(0.5, 4294967296), 77164, '32-bit needed');
// small exact cases: d=2 -> 2 people 0.5, 3 people 1; d=1 -> 2 people 1; 6-sided dice 4 dice = 1 - 360/1296
near(E.pair(2, 2), 0.5, 1e-12, 'd2 n2'); near(E.pair(3, 2), 1, 1e-12, 'd2 n3'); near(E.pair(2, 1), 1, 1e-12, 'd1'); near(E.pair(4, 6), 1 - 360 / 1296, 1e-12, 'dice'); is(E.pair(0, 365), 0, 'zero'); is(E.pair(1, 365), 0, 'one');
// me: one other person shares your day with chance 1/d; one person alone has no match
near(E.me(1, 365), 1 / 365, 1e-12, 'me one'); is(E.me(0, 365), 0, 'me zero'); near(E.me(1, 1), 1, 0, 'd1 me');
// expected pairs = C(n,2)/d: 23 people = 253/365 = 0.693
near(E.expectedPairs(23, 365), 253 / 365, 1e-12, 'pairs'); near(E.expectedPairs(1, 365), 0, 0, 'no pairs');
// monotone and bounded
is(E.pair(30, 365) > E.pair(29, 365), true, 'monotone'); is(E.pair(50, 365) <= 1, true, 'bounded');
// tiny probability stays accurate: 2 items in 2^32 space = 1 / 2^32
near(E.pair(2, 4294967296), 1 / 4294967296, 1e-18, 'tiny');
// invalid
is(E.pair(-1, 365), null, 'neg n'); is(E.pair(5, 0), null, 'zero d'); is(E.pairNeeded(1, 365), null, 'p=1'); is(E.pairNeeded(0, 365), null, 'p=0'); is(E.meNeeded(0.5, 1), null, 'd=1 me'); is(E.me(5, 0.5), null, 'bad d');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
