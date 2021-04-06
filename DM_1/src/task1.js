"use strict";
import validSchema from './validSchema.js';

export default class ChessDesk {

  constructor(length, width, symbol) {
    this.length = length;
    this.width = width;
    this.symbol = symbol;
  }

  board = document.getElementById("chess__board");

  getData = () => {
    let form = document.getElementById('chessForm');
    let length = document.getElementById('inputLength').value;
    let width = document.getElementById('inputWidth').value;
    let symbol = document.getElementById('inputSymbol').value;
    if (symbol.length > 1) symbol = symbol.slice(0, 1);
    let validation = (length, width, symbol) => {
      const _1 = validSchema.isInteger(+length, false);
      const _2 = validSchema.isInteger(+width, false);
      const _3 = validSchema.isEqual(length, width);
      const _4 = validSchema.isMin(length, 2);
      const _5 = validSchema.isMin(width, 2);
      const _6 = validSchema.isMax(length, 256);
      const _7 = validSchema.isMax(width, 256);
      const _8 = validSchema.isEmpty(symbol);
      const _9 = validSchema.isEmpty(length);
      const _10 = validSchema.isEmpty(width);
      return _1 && _2 && _3 && _4 && _5 && _6 && _7 && _8 && _9 && _10
    };
    let valid = validation(length, width, symbol);
    console.log("task#1:", valid);
    if (valid) {
      this.length = length;
      this.width = width;
      this.symbol = symbol;
      form.reset();
      return true;
      } else {
        form.reset();
        return false;
    }
  };

  buildString = () => {
    let pattern = `${this.symbol}\u00A0`;
    let br = '<br>';
    let res = "";
    for (let row = 1; row <= this.length; row++) {
      let str = "";
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
  };

  implementBoard = () => {
    let res = this.getData();
    if (this.board) this.board.innerHTML = '';
    if (res) {
      let chessDeskString = this.buildString();
      this.board.insertAdjacentHTML("beforeend", `<span>${chessDeskString}</span>`);
    }
  };

  listener = () => {
    document.getElementById('chessBuilder').addEventListener('click', this.implementBoard);
  };
}

function validationChess(w, l) {
  let validMessage = [];
  if (w !== l) validMessage.push({status: 'failed', reason: 'width and length are not equal'});
  if (w < 2 || l < 2) validMessage.push({status: 'failed', reason: 'the side is too small'});
  if (w > 256 || l > 256) validMessage.push({status: 'failed', reason: 'the side is too big'});
  return validMessage;
}



