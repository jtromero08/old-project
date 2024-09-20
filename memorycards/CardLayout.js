import React from "react";
import _ from "lodash";
import "./style.css";

const CardLayout = (props) => {
  let card = props.cardProps.state;
  let emptyAndFront = props.cardProps.eAF;

  return !_.isEmpty(card) ? (
    <div
      onClick={() => props.flipCard(card.id)}
      className={card.flipped ? "card is-flipped" : "card"}
    >
      <img
        src={emptyAndFront[0].front}
        className="card__face card__face--front"
      />
      <img src={card.card.img} className="card__face card__face--back" />
    </div>
  ) : (
    <h1>Nope</h1>
  );
};

export default CardLayout;
