const test = require("flug");
const segflip = require("./segflip");

test("flip empty array", ({ eq }) => {
  eq(segflip({ segments: [], min: 0, max: 100 }), [[0, 100]]);
  eq(segflip({ segments: null, min: 0, max: 100 }), [[0, 100]]);
});

test("flip one segment", ({ eq }) => {
  eq(segflip({ segments: [[2, 8]], min: 0, max: 10, debug: false }), [
    [0, 1],
    [9, 10]
  ]);
});

test("flip one segmen (inf)", ({ eq }) => {
  eq(segflip({ segments: [[2, 8]], debug: false }), [
    [-Infinity, 1],
    [9, Infinity]
  ]);
});

test("flip two segments", ({ eq }) => {
  eq(
    segflip({
      segments: [
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
      segments: [
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
      segments: [
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

test("recessions", ({ eq }) => {
  // 21st century recessions in the United States
  // from https://en.wikipedia.org/wiki/List_of_recessions_in_the_United_States
  const recessions = [
    [2001, 2001], // Early 2000s recession
    [2007, 2009], // Great Recession
    [2020, 2020] // COVID-19 recession
  ];

  const results = segflip({
    segments: recessions,

    // smallest possible integer
    // default is -Infinity
    min: 2000,

    // largest possible integer
    // default is Infinity
    max: 2022,

    debug: false
  });

  eq(results, [
    [2000, 2000],
    [2002, 2006],
    [2010, 2019],
    [2021, 2022]
  ]);
});
