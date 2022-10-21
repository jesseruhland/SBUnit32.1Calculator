const { getNums, mean, median, mode, ExpressError } = require("./helpers");

describe("Calculator helper function tests", function () {
  test("getNums() should return an array of integers", function () {
    let req = { query: { nums: "1,3,5,7" } };
    expect(getNums(req)).toEqual([1, 3, 5, 7]);
    let req2 = { query: { nums: "1,3,5,foo" } };
    expect(() => getNums(req2).toThrow());
  });

  test("mean() should calculate the average number", function () {
    expect(mean([1, 3, 5, 7])).toEqual(4);
    expect(mean([1, 2, 3, 4])).toEqual(2.5);
  });

  test("median() should return the middle number", function () {
    expect(median([1, 3, 5, 7])).toEqual(4);
    expect(median([1, 2, 3])).toEqual(2);
    expect(median([2, 3, 1])).toEqual(2);
  });

  test("mode() should return the most frequent number", function () {
    expect(mode([1, 3, 5, 7])).toEqual([1, 3, 5, 7]);
    expect(mode([1, 2, 3, 4, 4])).toEqual(4);
    expect(mode([1, 1, 2, 3, 4, 4])).toEqual([1, 4]);
  });
});
