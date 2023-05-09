import React, { useEffect, useContext, use } from "react";
import { ScoreContext } from "@/context/score.context";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  reset: () => void;
}

const GameOverModal = ({ open, setOpen, reset }: Props) => {
  const endGameModal = React.useRef<HTMLDialogElement>(null);
  const { state } = useContext(ScoreContext);

  useEffect(() => {
    if (open) {
      endGameModal.current?.showModal();
    } else {
      endGameModal.current?.close();
    }
  }, [open]);

  //   useEffect(() => {
  //     endGameModal.current?.showModal();
  //   }, []);

  return (
    <dialog
      ref={endGameModal}
      className="p-12 bg-black rounded-md border backdrop:bg-gray-500 backdrop:bg-opacity-50 text-white text-center"
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to bg-purple-600">
          Game Over
        </h1>
        <p className="text-2xl ">Your score is {state.score}</p>

        <button
          className=" p-4 bg-gradient-to-br from-blue-400 to bg-purple-600 rounded-md hover:scale-105 transform duration-200 cursor-pointer  transition-all"
          onClick={() => {
            reset();
            setOpen(false);
          }}
        >
          Save Score
        </button>
      </div>
    </dialog>
  );
};

export default GameOverModal;
