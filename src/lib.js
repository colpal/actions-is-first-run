const assert = require('assert');

exports.toMilliseconds = (string) => {
  const minutesRegex = /^\s*(\d+)m\s*$/;
  const minuteMatch = string.match(minutesRegex);
  if (minuteMatch) {
    const [, minutes] = minuteMatch;
    return parseInt(minutes, 10) * 60 * 1000;
  }
  return assert.fail(`"${string}" is not a valid duration string.`);
};

exports.areTimestampsClose = (timestampA, timestampB, threshold) => {
  const dateA = Date.parse(timestampA);
  assert.ok(dateA, `"${timestampA}" is not a parseable date string.`);

  const dateB = Date.parse(timestampB);
  assert.ok(dateB, `"${timestampB}" is not a parseable date string.`);

  return Math.abs(dateA - dateB) <= exports.toMilliseconds(threshold);
};
