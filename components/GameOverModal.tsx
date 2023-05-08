import React, { useEffect, useContext } from "react";
import { ScoreContext } from "@/context/score.context";
import Link from "next/link";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const GameOverModal = ({ open, setOpen }: Props) => {
  const endGameModal = React.useRef<HTMLDialogElement>(null);
  const { state } = useContext(ScoreContext);

  useEffect(() => {
    if (open) {
      endGameModal.current?.showModal();
    } else {
      endGameModal.current?.close();
    }
  }, [open]);

  return (
    <dialog ref={endGameModal}>
      <h1>Game Over</h1>
      <p>Your score is {state.score}</p>
      <Link href="/">
        <button>Save Score</button>
      </Link>
    </dialog>
  );
};

export default GameOverModal;
