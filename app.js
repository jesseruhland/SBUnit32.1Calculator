const express = require("express");
const { getNums, mean, median, mode, ExpressError } = require("./helpers");

const app = express();

app.get("/mean", (req, resp, next) => {
  try {
    const nums = getNums(req);
    const result = mean(nums);
    return resp.json({ operation: "mean", value: result });
  } catch (err) {
    return next(err);
  }
});

app.get("/median", (req, resp, next) => {
  try {
    const nums = getNums(req);
    const result = median(nums);
    return resp.json({ operation: "median", value: result });
  } catch (err) {
    return next(err);
  }
});

app.get("/mode", (req, resp, next) => {
  try {
    const nums = getNums(req);
    const result = mode(nums);
    return resp.json({ operation: "mode", value: result });
  } catch (err) {
    return next(err);
  }
});

app.get("/all", (req, resp, next) => {
  try {
    const nums = getNums(req);
    const avg = mean(nums);
    const med = median(nums);
    const mod = mode(nums);
    return resp.json({ operation: "all", mean: avg, median: med, mode: mod });
  } catch (err) {
    return next(err);
  }
});

// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

// global error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});

// local host port
app.listen(3000, function () {
  console.log("App on port 3000");
});
