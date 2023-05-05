"use client";
import React from "react";
import Card from "./Card";

import { Card as CardType, Cards } from "@/lib/cards";

import { useEffect, useState } from "react";

const GameFrame = () => {
  // dealing logic here
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    setCards(Cards());
  }, []);

  //flip logic here
  const [flippedCard, setFlippedCard] = useState<CardType | null>(null);

  const handleFlip = (card: CardType) => {
    if (flippedCard == null) {
      setFlippedCard(card);
    } else {
      if (flippedCard.id !== card.id) {
        setFlippedCard(null);
        // TODO: flip back
      } else {
        setFlippedCard(null);
        // TODO: cards stay flipped
      }
    }
  };

  return (
    <div>
      <h1>GameFrame</h1>

      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} card={card} onFlip={handleFlip} />
        ))}
      </div>
    </div>
  );
};

export default GameFrame;
