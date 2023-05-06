"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";

import { Card as CardType, Cards } from "@/lib/cards";

const GameFrame = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [matchedCards, setMatchedCards] = useState<CardType[]>([]);

  useEffect(() => {
    setCards(Cards());
  }, []);

  const handleFlip = (card: CardType) => {
    if (flippedCards.length === 0) {
      setFlippedCards([card]);
    } else if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];

      if (firstCard.id !== card.id) {
        setFlippedCards([]);
        setTimeout(() => {
          firstCard.flip();
          card.flip();
        }, 1000);
      } else {
        setMatchedCards([...matchedCards, firstCard, card]);
        setFlippedCards([]);
      }
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      alert("You won!");
    }
  }, [matchedCards, cards]);

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
