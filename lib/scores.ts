const winningMovePoints = 10;
const losingMovePoints = 5;

// AddPoints and SubtractPoints are used to calculate the score
export const AddPoints = (points: number): number => {
  points += winningMovePoints;
  return points;
};
export const SubtractPoints = (points: number): number => {
  points -= losingMovePoints;
  return points;
};

// SaveScore, GetScores, SetScores, GetHighScore, and ClearScores are used to save and retrieve scores from local storage
export const SaveScore = (score: number) => {
  const scores = GetScores();

  scores.push(score);
  // Sort scores in descending order and keep only the top 10
  scores.sort((a, b) => b - a);
  scores.splice(10);

  SetScores(scores);
};

export const GetScores = (): number[] => {
  const scores = localStorage.getItem("scores");
  return scores ? JSON.parse(scores) : [];
};

export const SetScores = (scores: number[]) => {
  localStorage.setItem("scores", JSON.stringify(scores));
};

export const GetHighScore = () => {
  const scores = GetScores();
  return scores.length ? Math.max(...scores) : 0;
};

export const ClearScores = () => {
  localStorage.removeItem("scores");
};
