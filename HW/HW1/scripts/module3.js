"use strict";

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

export default function menStillStanding(cards, teamCount) {
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
    let looseTeam = "";
    deletedA > deletedB ? looseTeam = "A" : looseTeam = "B";
    console.log(`Team ${looseTeam} is looser!`);
  }
  return [teamCount - deletedA, teamCount - deletedB];
}

