import arrangeTrianglesBySquare from '../src/task3.js';

mocha.setup('bdd');

const assert = chai.assert;

export default function test_3() {
  describe('Task#3 function Arrange Triangles By Square test', () => {
    let tr1 = [{
      "vertices": "ZAQ",
      z: 10,
      a: 20,
      q: 25,
    },
      {
        "vertices": "WAQ",
        w: 15,
        a: 20,
        q: 30,
      }];
    const tr2 = [{
        "vertices": "XAQ",
        z: 30,
        a: 20,
        q: 22.39,
      }];
    const tr3 = [{
      "vertices": "MAQ",
      m: 10,
      a: 20,
      q: 45,
    }];

    it('Sorted names: sq A > sq B ? [A, B]', () => {
      let res = arrangeTrianglesBySquare(tr1);
      assert.deepEqual(res,["WAQ", "ZAQ"]);
    });
    it('The result is array', () => {
      let res = arrangeTrianglesBySquare(tr1);
      assert(Array.isArray(res));
    });
    it('The vertices and sides are not equal', () => {
      assert.equal(arrangeTrianglesBySquare(tr2), `{"status":"failed","reason":"Vertices name of XAQ contain not existing vertices."}`);
    });
    it('Check the triangle for adequacy was failed', () => {
      assert.equal(arrangeTrianglesBySquare(tr3), `{"status":"failed","reason":"Check the triangle MAQ for adequacy was failed"}`);
    });
  });
}



