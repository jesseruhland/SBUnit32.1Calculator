// Helper functions for math operations

// Gather numbers from query string, throw errors if numbers are not integers, or do not exist all together
const getNums = (req) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "'nums' query required (separate numbers with commas)",
      400
    );
  }

  const nums = req.query.nums.split(",");

  for (let num of nums) {
    if (!parseInt(num)) {
      throw new ExpressError(`${num} is not a number!`, 400);
    }
  }
  const numsArr = nums.map((num) => parseInt(num));
  return numsArr;
};

// return the mean of provided nums array
const mean = (nums) => {
  const denom = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / denom;
};

// return the median of provided nums array (if center cannot be determined, average the two center numbers)
const median = (nums) => {
  nums.sort((a, b) => {
    return a - b;
  });
  const half = Math.floor(nums.length / 2);

  if (nums.length % 2 === 0) {
    return (nums[half - 1] + nums[half]) / 2;
  } else {
    return nums[half];
  }
};

// return the mode of provided nums array (mode can be multiple numbers, in that case, return array of those numbers)
const mode = (nums) => {
  const counts = {};
  const numSet = new Set(nums);
  for (let n of numSet) {
    let counter = 0;
    for (let num of nums) {
      if (num == n) {
        counter++;
      }
    }
    counts[n] = counter;
  }
  const countArr = Object.entries(counts);
  countArr.sort((a, b) => {
    return b[1] - a[1];
  });
  const resultArr = countArr.filter((arr) => arr[1] === countArr[0][1]);
  const result = [];
  for (let i in resultArr) {
    result.push(resultArr[i][0]);
  }
  console.log(result);
  const final = result.map((num) => parseInt(num));
  if (final.length === 1) {
    return final[0];
  } else {
    return final;
  }
};

// custom error class
class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = { getNums, mean, median, mode, ExpressError };
