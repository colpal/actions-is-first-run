const { toMilliseconds } = require('./lib');

test('should convert minute format to milliseconds', () => {
  Array(100)
    .fill()
    .forEach(() => {
      const random = Math.floor(Math.random() * 480);
      const expected = random * 1000;
      const actual = toMilliseconds(`${random}m`);
      expect(actual).toBe(expected);
    });
});

test('should fail to convert minutes to milliseconds', () => {
  expect(toMilliseconds('-1m')).toBeNull();
  expect(toMilliseconds('2')).toBeNull();
});
