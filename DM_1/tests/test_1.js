import ChessBoard from '../src/task1.js';

mocha.setup('bdd');

const assert = chai.assert;

export default function test_2() {
  describe('Task#1 ', () => {
    it('Board 3X3 with symbol o', () => {
      const myChessTest1 = new ChessBoard(3,3, 'o');
      assert.equal(myChessTest1.implementBoard(), 'o o<br> o <br>o o<br>');
    });
    it('Type of return is an string.', () => {
      const myChessTest1 = new ChessBoard(2,2, 'o');
      assert.equal(typeof myChessTest1.implementBoard(), 'string');
    });
    it('High ore length is less then min. Error', () => {
      const myChessTest2 = new ChessBoard(1,2, 'o');
      assert.equal(myChessTest2.implementBoard(), '{"status":"failed","reason":"Number 1 is less then min 2"}');
    });
    it('One or more entered values is bigger then max. Error', () => {
      const myChessTest3 = new ChessBoard(260,2, 'o');
      assert.equal(myChessTest3.implementBoard(), '{"status":"failed","reason":"Number 260 is bigger then max 256"}');
    });
    it('Width is not an integer. Error', () => {
      const myChessTest4 = new ChessBoard(33.4,2, 'o');
      assert.equal(myChessTest4.implementBoard(), '{"status":"failed","reason":"Number 33.4 is not an integer"}');
    });
    it('Width and length are not equal. Error', () => {
      const myChessTest4 = new ChessBoard(3,2, 'o');
      assert.equal(myChessTest4.implementBoard(), '{"status":"failed","reason":"Width and length are not equal"}');
    });
  });
}
