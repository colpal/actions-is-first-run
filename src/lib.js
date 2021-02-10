exports.toMilliseconds = (string) => {
  const minutesRegex = /^\s*(\d+)m\s*$/;
  const minuteMatch = string.match(minutesRegex);
  if (minuteMatch) {
    const [, minutes] = minuteMatch;
    return parseInt(minutes, 10) * 1000;
  }
  throw new Error(`"${string}" is not a valid duration string.`);
};
