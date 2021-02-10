const assert = require('assert');

exports.toMilliseconds = (string) => {
  const minutesRegex = /^\s*(\d+)m\s*$/;
  const minuteMatch = string.match(minutesRegex);
  if (minuteMatch) {
    const [, minutes] = minuteMatch;
    return parseInt(minutes, 10) * 1000;
  }
  return assert.fail(`"${string}" is not a valid duration string.`);
};
