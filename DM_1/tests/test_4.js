import findPalindrom from '../src/task4.js';

mocha.setup('bdd');

const assert = chai.assert;

export default function test_4() {
  describe('Task#4 function Find palindrom test', () => {
    it('Entered type is string, contains not only numbers and "-"', () => {
      assert.equal(findPalindrom('434223d3'), '{"status":"failed","reason":"String contains not only digits"}');
    });
    it('Entered type of arg is equivalent output type (string)', () => {
      let res = findPalindrom('31232');
      assert.equal(typeof res, 'string');
    });
    it('Entered type of arg is equivalent output type (number)', () => {
      let res = findPalindrom(31232);
      assert.equal(typeof res, 'number');
    });
    it('If entered number is negative, the output is negative too', () => {
      assert.equal(findPalindrom(-343), -343);
    });
    it('If there is no palindrom, return 0', () => {
      assert.equal(findPalindrom(123), 0);
    });
    it('Length of entered value is shorter then min', () => {
      assert.equal(findPalindrom(1), '{"status":"failed","reason":"1 length is shorter then min 2"}');
    });
    it('Length of entered value is longer then max', () => {
      assert.equal(findPalindrom(12223454443123223), '{"status":"failed","reason":"12223454443123224 is longer then max 16"}');
    });
    it('Several palindroms return just one', () => {
      assert.equal(findPalindrom(1222345444223), 222);
    });
    it('Several palindroms return just one', () => {
      assert.equal(findPalindrom(12223454444223), 4444);
    });
  });
}
