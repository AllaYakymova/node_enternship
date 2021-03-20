"use strict";

export default function arrangeWordsByNumbers(string) {
  let getNumber = word => +word.match(/\d+/)[0];

  if(string.length !== 0) {
    return string.split(" ")
      .map(item => {
        let number = getNumber(item);
        if (0 < number && number < 10) {
          return item;
        } else {
          return false;
        }
      })
      .filter(item => item)
      .sort((a, b) => (getNumber(a) > getNumber(b) ? 1 : -1))
      .join(" ");
  } else {
    return string;
  }
}
