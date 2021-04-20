import compareLuckyMethods from '../src/task5.js';

mocha.setup('bdd');

const assert = chai.assert;

export default function test_5() {
  const checkRes = {
    input: {
      min: 10,
      max: 20,
    },
    output:
      {
      winner: 'Complex approach: count evens & odds',
      bestScore: 1,
      worstScore: 0,
    }
  };
  const range1 = {
    min: 3,
    max: 'N',
  };
  const range2 = {
    min: -3,
    max: 999,
  };
  const range3 = {
    min: 10000,
    max: 1000000,
  };
  const range4 = {
    min: 333,
    max: 99,
  };
  describe('Task#5 function Lucky Tickets test', () => {
    it('Winner 10 - 20 is count evens & odds', () => {
      assert.deepEqual(compareLuckyMethods(checkRes.input), checkRes.output);
    });
    it('Type of return is an object.', () => {
      let res = compareLuckyMethods(checkRes.input, true);
      assert.equal(typeof res, 'object');
    });
    it('N is not a number. Error', () => {
      assert.equal(compareLuckyMethods(range1), '{"status":"failed","reason":"N is not a number"}');
    });
    it('One or more entered values is less then min. Error', () => {
      assert.equal(compareLuckyMethods(range2), '{"status":"failed","reason":"Number -3 is less then min 0"}');
    });
    it('One or more entered values is bigger then max. Error', () => {
      assert.equal(compareLuckyMethods(range3), '{"status":"failed","reason":"Number 1000000 is bigger then max 999999"}');
    });
    it('Min is bigger then max. Error', () => {
      assert.equal(compareLuckyMethods(range4), '{"status":"failed","reason":"Number 99 is not bigger then 333"}');
    });
  });
}
