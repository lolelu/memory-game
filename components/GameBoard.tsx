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
    // Deal the cards when the component mounts
    ResetGameState();
  }, []);

  useEffect(() => {
    CheckGameStatus();
  }, [flippedPairs]);

  const handleFlip = async (card: CardType) => {
    if (interacting) {
      // Prevent the user from interacting with the cards while they are flipping
      return;
    }

    setInteracting(true);
    // Flip the card interacted with
    card.flipUp();

    if (!flippedCard) {
      // If there is no flipped card, set the flipped card to the card interacted with
      setFlippedCard(card);
    } else {
      // If there is a flipped card, check if the card interacted with is the same as the flipped card
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (flippedCard.id === card.id) {
        // If the card interacted with is the same as the flipped card, add points and keep the cards flipped
        AddPoints();
        setFlippedPairs((value) => value + 1);
      } else {
        // If the card interacted with is not the same as the flipped card, remove points and flip the cards back down
        RemovePoints();
        flippedCard.flipDown();
        card.flipDown();
      }
      // Reset the flipped card useState to null after a delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFlippedCard(null);
    }

    // Allow the user to interact with the cards again
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
      //Game is not over, continue
      return;
    }

    if (flippedPairs === cardsDealt.length / 2) {
      // Game is over
      dispatch({ type: "SAVE" });
      setOpenGameOverModal(true);
    }
  };

  //Function that resets the game state in case of forfeit or win
  const ResetGameState = async () => {
    // Reset the game state
    setInteracting(true);

    for (const card of cardsDealt) {
      card.flipDown();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
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
