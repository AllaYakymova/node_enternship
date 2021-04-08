import compareEnvelopes from '../src/task2.js';

mocha.setup('bdd');

const assert = chai.assert;

export default function test_2() {
  describe('Task#2 function Envelop 1 fit into envelop 2 test', () => {
    it('equal envelops = no fit', () => {
      assert.equal(compareEnvelopes({a:2, b:3}, {c:2, d:3}), 0);
    });
    it('Side is more then Max = {status: \'failed\', reason: `Number 1000001 is bigger then max 1000000`}', () => {
      assert.equal(compareEnvelopes({a:2, b:1000001}, {c:2, d:3}), JSON.stringify({"status":"failed","reason":"Number 1000001 is bigger then max 1000000"}) );
    });
    it('Extra side of envelope = {status: "failed", reason: `Object has extra element(/s)`}', () => {
      assert.equal(compareEnvelopes({a:2, b:10, z:5}, {c:2, d:3}),  JSON.stringify({"status":"failed","reason":"Object has extra element(/s)"}) );
    });
    it('2x3 is fit into 3x4', () => {
      assert.equal(compareEnvelopes({a:2, b:3}, {c:3, d:4}), `Envelope with sides 2,3 is fit into envelope with sides 3,4`);
    });
  });
}
