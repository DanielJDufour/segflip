function segflip({ segments: segs, min = -Infinity, max = Infinity, debug = false }) {
  if (debug) console.log("[segflip] segs:", segs);
  if (segs === undefined || segs === null || (Array.isArray(segs) && segs.length === 0)) {
    if (debug) console.log("[segflip] segments are empty so return the whole row flipped");
    return [[min, max]];
  }

  if (segs.length === 1) {
    // only one inside segment
    const [start, end] = segs[0];
    const flipped = [];
    if (start > min) flipped.push([min, start - 1]);
    if (end < max) flipped.push([end + 1, max]);
    return flipped;
  }

  const flipped = [];

  for (let i = 0; i < segs.length; i++) {
    const first = i === 0;
    const last = i === segs.length - 1;
    const [start, end] = segs[i];
    if (debug) console.log("[segflip] i:", JSON.stringify({ i, start, end, first, last }));
    if (first) {
      if (start > min) {
        // segement doesn't extend left of min
        flipped.push([min, start - 1]);
        flipped.push([end + 1]);
      }
    } else if (last) {
      if (debug) console.log("[segflip] last:", JSON.stringify({ last, flipped, end, max }));
      flipped[flipped.length - 1].push(start - 1);
      if (end < max) {
        // last inside segment doesn't extend right of max
        flipped.push([end + 1, max]);
      }
    } else {
      flipped[flipped.length - 1].push(start - 1);
      flipped.push([end + 1]);
    }
  }
  return flipped;
}

if (typeof define === "function" && define.amd)
  define(function () {
    return segflip;
  });
if (typeof module === "object") module.exports = segflip;
if (typeof window === "object") window.segflip = segflip;
if (typeof self === "object") self.segflip = segflip;
