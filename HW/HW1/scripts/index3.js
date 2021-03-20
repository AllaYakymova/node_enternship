"use strict";

let cards = ["A2R", "A8Y", "B5R", "A10R", "B6Y", "B1R", "A6Y", "A7Y", "A3R", "B2Y", "A2Y", "A8Y", "A5R", "A10R", "A6Y", "A1R", "A6Y", "A7Y", "A9R", "A2Y"];
let cards1 = [];
let cards2 = ["A4Y", "A4Y"];
let cards3 = ["A4Y", "A4R"];
let cards4 = ["A4Y", "A5R", "B5R", "A4Y", "B6Y"];
let cards5 = ["A4R", "A4R", "A4R"];
let cards6 = ["A4R", "A6R", "A8R", "A10R", "A11R"];


const divideCards = (card, range) => card.substring(range[0], range[1]);

function checkCards(cards, teamCount) {
  let deletedCount = 0;
  let preparedCards = cards.map(card => divideCards(card, [1])); //removed number of team

  for (let i = 1; i <= teamCount; i++) {
    let arr = preparedCards.filter(card => {
      let number;
      if (card.length === 2) {
        number = divideCards(card, [0, 1]);
      } else {
        number = divideCards(card, [0, 2]);
      }
      if (i === +number) {
        return card;
      }
    });

    let deleteCard = arr.filter(card => divideCards(card, [card.length - 1]) === "R").length;
    if (arr.length >= 2 || deleteCard !== 0) {
      deletedCount++;
    }
  }
  return deletedCount;
}

function menStillStanding(cards, teamCount) {
  let teamA = [];
  let teamB = [];
  cards.filter(card => {
    let result = divideCards(card, [0, 1]);
    if (result === "A") {
      teamA = [...teamA, card];
    } else {
      teamB = [...teamB, card];
    }
  });
  let deletedA = checkCards(teamA, teamCount);
  let deletedB = checkCards(teamB, teamCount);

  if (deletedA > 7 || deletedB > 7) {
    console.log("Your team is looser!");
  }
  return [teamCount - deletedA, teamCount - deletedB];
}

console.log(menStillStanding(cards, 11));
console.log(menStillStanding(cards1, 11));
console.log(menStillStanding(cards2, 11));
console.log(menStillStanding(cards3, 11));
console.log(menStillStanding(cards4, 11));
console.log(menStillStanding(cards5, 11));
console.log(menStillStanding(cards6, 11));

