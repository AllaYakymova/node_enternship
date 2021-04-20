import numericalSequence from '../src/task6.js';

mocha.setup('bdd');

const assert = chai.assert;

export default function test_6() {
  describe('Task#6 function Numerical Sequence test', () => {
    it('Length 2 & minSquare 3. Result 2,3', () => {
      assert.equal(numericalSequence(2, 3), '2,3');
    });
    it('N is not a number. Error', () => {
      assert.equal(numericalSequence(3, 'N'), '{"status":"failed","reason":"N is not a number"}');
    });
    it('5.5 is not an integer. Error', () => {
      assert.equal(numericalSequence(5.5, 10), '{"status":"failed","reason":"Number 5.5 is not an integer"}');
    });
    it('One or more entered values is less then min. Error', () => {
      assert.equal(numericalSequence(0, 4), '{"status":"failed","reason":"Number 0 is less then min 1"}');
    });
    it('One or more entered values is bigger then max. Error', () => {
      assert.equal(numericalSequence(3, 1000001), '{"status":"failed","reason":"Number 1000001 is bigger then max 1000000"}');
    });
  });
}
