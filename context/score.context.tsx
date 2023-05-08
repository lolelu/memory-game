"use client";
import {
  AddPoints,
  SubtractPoints,
  SaveScore,
  ClearScores,
} from "@/lib/scores";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  score: number;
};

type ActionType = {
  type: string;
};

const initialState: StateType = {
  score: 0,
};

const reducer = (state: StateType, action: ActionType) => {
  console.log(action);
  switch (action.type) {
    case "CORRECT":
      return { ...state, score: AddPoints(state.score) };
    case "WRONG":
      return { ...state, score: SubtractPoints(state.score) };
    case "RESETPOINTS":
      return { ...state, score: 0 };
    case "SAVE":
      // Save the score in the token using the score lib
      SaveScore(state.score);
      return { ...state, score: state.score };
    case "CLEAR":
      // Clear the score in the token using the score lib
      ClearScores();
      return { ...state, score: 0 };
    default:
      return state;
  }
};

export const ScoreContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const ScoreContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ScoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ScoreContext.Provider>
  );
};
