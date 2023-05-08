"use client";
import React, { useState, useEffect, useContext } from "react";
import { ScoreContext } from "@/context/score.context";
import Link from "next/link";
import Card from "./Card";

import { Card as CardType, Cards } from "@/lib/cards";

const GameBoard = () => {
  const { state, dispatch } = useContext(ScoreContext);
  const [cardsDealt, setCardsDealt] = useState<CardType[]>([]);
  const [flippedCard, setFlippedCard] = useState<CardType | null>(null);
  const [flipping, setFlipping] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [flippedPairs, setFlippedPairs] = useState<number>(0);

  const endGameModal = React.useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const cards = Cards();
    setCardsDealt(cards);
  }, []);

  useEffect(() => {
    CheckGameStatus();
  }, [flippedPairs]);

  const handleFlip = async (card: CardType) => {
    if (flipping) {
      return;
    }

    setFlipping(true);
    card.flipUp();

    if (!flippedCard) {
      setFlippedCard(card);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (flippedCard.id === card.id) {
        AddPoints();
        setFlippedPairs((value) => value + 1);
      } else {
        RemovePoints();
        flippedCard.flipDown();
        card.flipDown();
      }
      setFlippedCard(null);
    }
    setFlipping(false);
  };

  const AddPoints = () => {
    // Add points to the player's score
    dispatch({ type: "CORRECT" });
  };

  const RemovePoints = () => {
    // Remove points from the player's score
    dispatch({ type: "WRONG" });
  };

  const CheckGameStatus = () => {
    // Check if the game is over
    if (cardsDealt.length === 0) {
      return;
    }

    if (flippedPairs === cardsDealt.length / 2) {
      // Game is over
      dispatch({ type: "SAVE" });
      endGameModal.current?.showModal();

      //go back to the home page and save the score (use next router)
    }
  };

  return (
    <div>
      <h1>Score: {state.score}</h1>
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        {cardsDealt.map((card, index) => (
          <Card key={index} card={card} onFlip={handleFlip} />
        ))}
      </div>

      {/* Dialog that shows when you win */}
      <dialog ref={endGameModal}>
        <h1>Game Over</h1>
        <p>Your score is {state.score}</p>
        <Link href="/">
          <button>Save Score</button>
        </Link>
      </dialog>
    </div>
  );
};

export default GameBoard;
