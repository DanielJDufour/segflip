const test = require("flug");
const segflip = require("./segflip");

test("flip empty array", ({ eq }) => {
  eq(segflip({ segs: [], min: 0, max: 100 }), [[0, 100]]);
  eq(segflip({ segs: null, min: 0, max: 100 }), [[0, 100]]);
});

test("flip one segment", ({ eq }) => {
  eq(segflip({ segs: [[2, 8]], min: 0, max: 10, debug: false }), [
    [0, 1],
    [9, 10]
  ]);
});

test("flip one segmen (inf)", ({ eq }) => {
  eq(segflip({ segs: [[2, 8]], debug: false }), [
    [-Infinity, 1],
    [9, Infinity]
  ]);
});

test("flip two segments", ({ eq }) => {
  eq(
    segflip({
      segs: [
        [2, 3],
        [5, 7]
      ],
      min: 0,
      max: 10,
      debug: false
    }),
    [
      [0, 1],
      [4, 4],
      [8, 10]
    ]
  );
});

test("flip three segments", ({ eq }) => {
  eq(
    segflip({
      segs: [
        [2, 3],
        [5, 7],
        [9, 10]
      ],
      min: 0,
      max: 12,
      debug: false
    }),
    [
      [0, 1],
      [4, 4],
      [8, 8],
      [11, 12]
    ]
  );

  eq(
    segflip({
      segs: [
        [2, 3],
        [5, 7],
        [9, 10]
      ],
      min: 0,
      max: 10,
      debug: false
    }),
    [
      [0, 1],
      [4, 4],
      [8, 8]
    ]
  );
});
