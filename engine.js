(function (root) {
  'use strict';
  var MAXN = 5e6;
  // Birthday problem (Wikipedia): P(no match among n) = prod_{i<n} (d - i) / d, so P(match) = 1 - that.
  function pair(n, d) {
    n = Math.floor(+n); d = +d;
    if (!(n >= 0 && n <= MAXN) || !(d >= 1)) return null;
    if (n > d) return 1;
    var s = 0;
    for (var i = 1; i < n; i++) s += Math.log1p(-i / d);
    return -Math.expm1(s); // 1 - exp(s), accurate when the answer is tiny
  }
  // chance that at least one of n other people shares YOUR day: 1 - ((d-1)/d)^n
  function me(n, d) {
    n = Math.floor(+n); d = +d;
    if (!(n >= 0 && n <= 1e12) || !(d >= 1)) return null;
    if (d === 1) return n > 0 ? 1 : 0;
    return -Math.expm1(n * Math.log1p(-1 / d));
  }
  function expectedPairs(n, d) { n = +n; d = +d; if (!(n >= 0) || !(d >= 1)) return null; return n * (n - 1) / 2 / d; }
  // smallest group with at least probability p of some pair matching
  function pairNeeded(p, d) {
    p = +p; d = +d;
    if (!(p > 0 && p < 1) || !(d >= 1)) return null;
    var s = 0, target = Math.log1p(-p), n = 1; // need s <= target
    while (n <= d + 1) {
      if (s <= target) return n;
      s += Math.log1p(-n / d); n++;
      if (n > MAX_SEARCH) return null;
    }
    return Math.floor(d) + 1;
  }
  var MAX_SEARCH = 2e7;
  // smallest number of OTHER people with at least probability p that one shares your day
  function meNeeded(p, d) {
    p = +p; d = +d;
    if (!(p > 0 && p < 1) || !(d > 1)) return null;
    return Math.ceil(Math.log1p(-p) / Math.log1p(-1 / d) - 1e-9);
  }
  var api = { pair: pair, me: me, expectedPairs: expectedPairs, pairNeeded: pairNeeded, meNeeded: meNeeded };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.SameDay = api;
})(typeof window !== 'undefined' ? window : this);
