"use client";
import { GetScores, AddScore, ClearScores } from "@/lib/scores";
import { useEffect, useState } from "react";

const Scores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setScores(GetScores());
  }, []);

  return (
    <div>
      <h1>Scores</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{score}</li>
        ))}
      </ul>

      <button onClick={CreateFakeScores}>Create fake scores</button>
    </div>
  );
};

export default Scores;

const CreateFakeScores = () => {
  ClearScores();
  for (let i = 0; i < 10; i++) {
    AddScore(Math.floor(Math.random() * 1000));
  }
};
