"use client";
import { useEffect, useState, useContext } from "react";
import { ScoreContext } from "@/context/score.context";
import { GetScores, GetHighScore } from "@/lib/scores";

const Scores = () => {
  const { state, dispatch } = useContext(ScoreContext);
  const [scores, setScores] = useState([]);

  const ClearScores = () => {
    dispatch({ type: "CLEAR" });
  };

  //TODO: This rerender every frame, fix it
  useEffect(() => {
    setScores(GetScores());
  }, [state]);

  return (
    <div>
      <h1>Scores</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{score}</li>
        ))}
      </ul>

      <button onClick={ClearScores}>ClearScores</button>
    </div>
  );
};

export default Scores;
