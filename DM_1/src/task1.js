'use strict';
import validSchema from './validSchema.js';

export default class ChessBoard {

  constructor(length, width, symbol) {
    this.length = length;
    this.width = width;
    this.symbol = symbol;
  }

  board = document.getElementById('chess__board');

  validation = () => {
    const _1 = validSchema.isInteger(+this.length);
    const _2 = validSchema.isInteger(+this.width);
    const _3 = validSchema.isMin(this.length, 2);
    const _4 = validSchema.isMin(this.width, 2);
    const _5 = validSchema.isMax(this.length, 256);
    const _6 = validSchema.isMax(this.width, 256);
    const _7 = validSchema.isEqual(this.length, this.width);
    const _8 = validSchema.isEmpty(this.symbol);
    const _9 = validSchema.isEmpty(this.length);
    const _10 = validSchema.isEmpty(this.width);
    const err = [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10].find(el => el !== true);
    return err ? err : true;
  };

  buildString = () => {
    let isValid = this.validation(this.length, this.width, this.symbol);
    if (typeof isValid === 'object') return JSON.stringify(isValid);
    if (isValid) {
      let pattern = `${this.symbol}\u00A0`;
      let br = '<br>';
      let res = '';
      for (let row = 1; row <= this.length; row++) {
        let str = '';
        if (this.width % 2 === 0) {
          if (row % 2 === 0) {
            str = `\u00A0${pattern.repeat((this.width - 1) / 2)}${this.symbol}`;
          } else {
            str = pattern.repeat((this.width) / 2);
          }
        } else {
          if (row % 2 !== 0) {
            str = `${pattern.repeat((this.width - 1) / 2)}${this.symbol}`;
          } else {
            str = `\u00A0${pattern.repeat((this.width) / 2)}`;
          }
        }
        res = res + str + br;
      }
      return res;
    }
  };

  getData = () => {
    let form = document.getElementById('chessForm');
    this.length = document.getElementById('inputLength').value;
    this.width = document.getElementById('inputWidth').value;
    this.symbol = document.getElementById('inputSymbol').value;
    if (this.symbol.length > 1) this.symbol = this.symbol.slice(0, 1);
    form.reset();
  };

  implementBoard = () => {
    let input = false;
    if (!this.width && !this.length && !this.symbol) {
      this.getData();
      input = true;
    }
    if (this.board) this.board.innerHTML = '';
      let chessDeskString = this.buildString();
    if (typeof chessDeskString === 'object') {
      return JSON.stringify(chessDeskString);
    } else {
      if(input) {
        this.board.insertAdjacentHTML('beforeend', `<span>${chessDeskString}</span>`);
        this.length = null;
        this.width = null;
        this.symbol = '';
      } else {
        return chessDeskString
      }
    }
  };

  listener = () => {
    document.getElementById('chessBuilder')
      .addEventListener('click', this.implementBoard);
  };
}




