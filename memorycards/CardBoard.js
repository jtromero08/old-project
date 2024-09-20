import React, { Component } from "react";
import cards from "./cards.json";
import _ from "lodash";
import CardLayout from "./CardLayout";

export class CardBoard extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      emptyAndFront: [],
      duplicated: [],
      // matchesCards: [],
      score: 0,
    };

    this.flipCard = this.flipCard.bind(this);
  }

  cardGenerator() {
    let i = 0;

    _.filter(cards, (card) => {
      !card.front && !card.blank
        ? this.state.cards.push(card)
        : this.state.emptyAndFront.push(card);
    });

    let duplication = [...this.state.cards, ...this.state.cards];
    let tempDup = [];
    let cardsShuffle = _.shuffle(duplication);

    _.map(duplication, (dCard) => {
      tempDup.push({
        id: i++,
        card: dCard,
        flipped: false,
        hasTwin: false,
      });
    });

    this.setState({ duplicated: tempDup });
  }

  componentDidMount() {
    this.cardGenerator();
  }

  flipCard(id) {
    let twinCards = [];

    let cardResult = _.map(this.state.duplicated, (card) => {
      if (card.id === id) {
        if (!card.flipped) {
          card.flipped = true;
        }
      }

      if (card.flipped && !card.hasTwin) twinCards.push(card);

      return card;
    });

    if (twinCards.length === 2) {
      this.verifyIfDuplicate(twinCards);
    }

    this.setState({ duplicated: cardResult });
  }

  verifyIfDuplicate(twinCards) {
    if (twinCards[0].card.name === twinCards[1].card.name) {
      _.filter(twinCards, (card) => {
        if (!card.hasTwin) card.hasTwin = true;
      });

      for (let x in twinCards)
        if (this.state.duplicated[x].id === twinCards[x].id) {
          this.state.duplicated[x].hasTwin = twinCards[x].hasTwin;
        }

      this.setState({ score: this.state.score + 1 });
    } else {
      _.filter(twinCards, (card) => {
        card.flipped = false;
      });

      for (let x in twinCards)
        if (this.state.duplicated[x].id === twinCards[x].id)
          this.state.duplicated[x].flipped = twinCards[x].card.flipped;
    }
  }

  // Still working.

  /*
   * endgame() {
   *  let tempMatchesCards = _.filter(this.state.duplicated, (card) => {
   *    if (card.hasTwin) return card;
   *  });
   *
   *  if (tempMatchesCards.length === 2) this.setState({ matchesCards: 1 });
   *  console.log(this.state.matchesCards);
   * }
   */

  creatingCardsLayout() {
    if (!this.state.duplicated) {
      return <h1>Loading...</h1>;
    }

    if (this.state.duplicated) {
      return _.map(this.state.duplicated, (card) => {
        return (
          <CardLayout
            flipCard={this.flipCard}
            key={card.id}
            cardProps={{
              state: card,
              eAF: this.state.emptyAndFront,
            }}
          />
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Score:<span id="result"> {this.state.score}</span>
        </h1>
        <div className="grid">{this.creatingCardsLayout()}</div>
        <h1>
          I don't own any of the images, they goes to their respective owners.
        </h1>
        <footer className="footer">&copy; Copyright 2020 Jt inc.</footer>
      </div>
    );
  }
}

export default CardBoard;
