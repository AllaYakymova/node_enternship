import getFibLine from '../src/task7.js';

mocha.setup('bdd');

const assert = chai.assert;

export default function test_7() {
  const context1 = {
    length: 3,
  };
  const context2 = {
    min: 5,
    max: 30,
    length: 3,
  };
  const context3 = {
    min: 2,
    max: 1000001,
    length: 3,
  };
  const context4 = {
    min: 5,
    max: 30.5,
    length: 3,
  };

  describe('Task#7 function getFibLine test', () => {
    it('Type of return is array.', () => {
      let res = getFibLine(context1, true);
      assert.equal(Array.isArray(res), true);
    });
    it('Only length 3. Result [1,1,2]', () => {
      let res = getFibLine(context1);
      assert.deepEqual(res, [1,1,2]);
    });
    it('Min - 5, max - 30, length - 3 is not counted. Result [5,8,13,21]', () => {
      assert.deepEqual(getFibLine(context2), [5,8,13,21]);
    });
    it('Max is bigger then max meaning. Error', () => {
      assert.equal(getFibLine(context3), '{"status":"failed","reason":"Number 1000001 is bigger then max 1000000"}');
    });
    it('Max = 30.5 is not an integer. Error', () => {
      assert.equal(getFibLine(context4), '{"status":"failed","reason":"Number 30.5 is not an integer"}');
    });
  });
}
