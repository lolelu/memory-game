"use client";
import React, { useState, useEffect, useContext } from "react";
import { ScoreContext } from "@/context/score.context";
import Link from "next/link";
import Card from "./Card";

import { Card as CardType, Cards } from "@/lib/cards";
import GameOverModal from "./GameOverModal";

const GameBoard = () => {
  const { state, dispatch } = useContext(ScoreContext);

  const [cardsDealt, setCardsDealt] = useState<CardType[]>([]);
  const [flippedCard, setFlippedCard] = useState<CardType | null>(null);
  const [flipping, setFlipping] = useState<boolean>(false);
  const [flippedPairs, setFlippedPairs] = useState<number>(0);
  const [openGameOverModal, setOpenGameOverModal] = useState<boolean>(false);

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

      //TODO:RESET THE GAME
      setOpenGameOverModal(true);

      //go back to the home page and save the score (use next router)
    }
  };

  return (
    <div>
      <h1>Score: {state.score}</h1>
      <div className="grid grid-cols-4 grid-rows-4 gap-6">
        {cardsDealt.map((card, index) => (
          <Card key={index} card={card} onFlip={handleFlip} />
        ))}
      </div>

      {/* Dialog that shows when you win */}
      <GameOverModal open={openGameOverModal} setOpen={setOpenGameOverModal} />
    </div>
  );
};

export default GameBoard;
