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

test("several short close segments", ({ eq }) => {
  const results = segflip({
    segments: [
      [487, 488],
      [489, 501],
      [502, 503],
      [504, 506]
    ],
    min: 0,
    max: 900
  });
  eq(results, [
    [0, 486],
    [507, 900]
  ]);
});

test("flip consecutive segments", ({ eq }) => {
  const segments = [
    [49, 51],
    [52, 70]
  ];
  const results = segflip({
    segments,
    min: 0,
    max: 255,
    debug: false
  });
  eq(results, [
    [0, 48],
    [71, 255]
  ]);
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

test("bug", ({ eq }) => {
  const results = segflip({
    segments: [
      [0, 11],
      [58, 59]
    ],
    min: 0,
    max: 255,
    debug: false
  });
  eq(results, [
    [12, 57],
    [60, 255]
  ]);
});

test("several short close segments with one gap", ({ eq }) => {
  const results = segflip({
    segments: [
      [487, 488],
      [499, 501],
      [502, 503],
      [505, 506]
    ],
    min: 0,
    max: 900
  });
  eq(results, [
    [0, 486],
    [489, 498],
    [504, 504],
    [507, 900]
  ]);
});
