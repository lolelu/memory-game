"use client";
import {
  AddPoints,
  SubtractPoints,
  SaveScore,
  ClearScores,
} from "@/lib/scores";

import React, { Dispatch, createContext, useReducer } from "react";

// The type of the state
type StateType = {
  score: number;
};

// The type of the action
type ActionType = {
  type: "CORRECT" | "WRONG" | "RESETPOINTS" | "SAVE" | "CLEAR";
};

// The initial state
const initialState: StateType = {
  score: 0,
};

// The reducer function that takes in the old state and an action and returns the new state
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

// The context that will be used to access the state and dispatch
export const ScoreContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

// The provider that will wrap the app and provide the context
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
