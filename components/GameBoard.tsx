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
  const [interacting, setInteracting] = useState<boolean>(false);
  const [flippedPairs, setFlippedPairs] = useState<number>(0);
  const [openGameOverModal, setOpenGameOverModal] = useState<boolean>(false);

  useEffect(() => {
    ResetGameState();
  }, []);

  useEffect(() => {
    CheckGameStatus();
  }, [flippedPairs]);

  const handleFlip = async (card: CardType) => {
    if (interacting) {
      return;
    }

    setInteracting(true);
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFlippedCard(null);
    }
    setInteracting(false);
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

  const ResetGameState = async () => {
    // Reset the game state
    setInteracting(true);
    cardsDealt.forEach((card) => card.flipDown());
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFlippedCard(null);
    setFlippedPairs(0);
    dispatch({ type: "RESETPOINTS" });
    const cards = Cards();
    setCardsDealt(cards);
    setInteracting(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className=" text-4xl font-bold font-serif ">MEMOVAS</h1>
      <h2 className=" text-xl font-bold">Score: {state.score}</h2>
      <div className="flex flex-row gap-4">
        <Link href="/" className=" p-4">
          GO BACK
        </Link>
        <button onClick={ResetGameState} className=" p-4">
          RESET
        </button>
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-6">
        {cardsDealt.map((card, index) => (
          <Card key={index} card={card} onFlip={handleFlip} />
        ))}
      </div>

      {/* Dialog that shows when you win */}
      <GameOverModal
        open={openGameOverModal}
        setOpen={setOpenGameOverModal}
        reset={ResetGameState}
      />
    </div>
  );
};

export default GameBoard;
