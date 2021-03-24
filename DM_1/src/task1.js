"use strict";

export default class ChessDesk {
  constructor(length = 8, wide = 8, symbol = ".") {
    this.length = length;
    this.wide = wide;
    this.symbol = symbol;
  }

  setString() {
    let pattern = `${this.symbol}\u00A0`;
    let br = `\n`;
    let res = "";
    for (let row = 1; row <= this.length; row++) {
      let str = "";
      if (this.wide % 2 === 0) {
        if (row % 2 === 0) {
          str = `\u00A0${pattern.repeat((this.wide - 1) / 2)}${this.symbol}`;
        } else {
          str = pattern.repeat((this.wide) / 2);
        }
      } else {
        if (row % 2 !== 0) {
          str = `${pattern.repeat((this.wide - 1) / 2)}${this.symbol}`;
        } else {
          str = `\u00A0${pattern.repeat((this.wide) / 2)}`;
        }
      }
      res = res + str + br;
    }
    return res;
  }

  implementDesk() {
    let chessDeskString = this.setString();
    console.log(chessDeskString);
    let br = new RegExp(/\n/);
    let res = chessDeskString.replaceAll(/\n/, '<br>');
    console.log(res);
    let table = document.getElementById("chess_desk");
    table.insertAdjacentHTML("beforeend", `<span>${chessDeskString}</span>`);
  }
}
