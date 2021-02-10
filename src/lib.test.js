const { areTimestampsClose, toMilliseconds } = require('./lib');

test('should convert minute format to milliseconds', () => {
  Array(100)
    .fill()
    .forEach(() => {
      const random = Math.floor(Math.random() * 480);
      const expected = random * 60 * 1000;
      const actual = toMilliseconds(`${random}m`);
      expect(actual).toBe(expected);
    });
});

test('should fail to convert minutes to milliseconds', () => {
  ['-1m', '2'].forEach((s) => {
    expect(() => toMilliseconds(s)).toThrow(s);
  });
});

test('should determine timestamps are close enough', () => {
  [
    ['2021-02-10T16:30:00Z', '2021-02-10T16:30:30Z', '1m'],
    ['2021-02-10T16:30:00Z', '2021-02-10T16:34:00Z', '5m'],
    ['2021-02-10T16:30:00Z', '2021-02-10T16:35:00Z', '5m'],
  ].forEach((parameters) => {
    expect(areTimestampsClose(...parameters)).toBeTruthy();
  });
});

test('should determine timestamps are not close enough', () => {
  [
    ['2021-02-10T16:30:00Z', '2021-02-10T16:35:00Z', '4m'],
    ['2021-02-10T16:30:00Z', '2021-02-10T16:30:01Z', '0m'],
  ].forEach((parameters) => {
    expect(areTimestampsClose(...parameters)).toBeFalsy();
  });
});
