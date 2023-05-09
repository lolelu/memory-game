"use client";
import { useEffect, useState, useContext } from "react";
import { ScoreContext } from "@/context/score.context";
import { GetScores, GetHighScore } from "@/lib/scores";
import Link from "next/link";

const Scores = () => {
  const { state, dispatch } = useContext(ScoreContext);
  const [scores, setScores] = useState<number[]>([]);

  const ClearScores = () => {
    dispatch({ type: "CLEAR" });
  };

  useEffect(() => {
    setScores(GetScores());
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Scores</h1>
      <ul className="bg-white rounded-lg p-6 w-80 text-center">
        {scores.map((score, index) => (
          <li key={index} className="border-b border-gray-200 py-2 text-black">
            <span>{index + 1}.</span> {score}
          </li>
        ))}
      </ul>

      <div className=" mt-6 grid grid-cols-2 gap-4 text-center  ">
        <Link href="/">
          <p className=" bg-green-600 text-white hover:bg-green-800 rounded font-semibold shadow p-4">
            Home
          </p>
        </Link>
        <button onClick={ClearScores}>
          <p className="bg-red-600 text-white hover:bg-red-800 rounded font-semibold shadow p-4">
            Clear Scores
          </p>
        </button>
      </div>
    </div>
  );
};

export default Scores;
