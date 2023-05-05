//Generate an array of 16 cards, 8 pairs of 2 cards, each pair has the same image from unsplash

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const GenerateCards = (): Card[] => {
  const cards = [];

  //generate a random int between 1 and 200

  const randomAdd = randomInt(20, 200);

  for (let i = 0; i < 8; i++) {
    const card = {
      id: i,
      //   image: `https://source.unsplash.com/featured/?nature,water,${i}`,
      image: `https://picsum.photos/seed/${i + randomAdd}/96/160`,
    };
    cards.push(card);
    cards.push({ ...card });
  }
  return cards;
};
const ShuffledCards = (): Card[] => {
  const cards = GenerateCards();
  return shuffle(cards);
};

// Shuffle the cards
const shuffle = (cards: Card[]) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
  return cards;
};

export interface Card {
  id: number;
  image: string;
}

export const Cards = (): Card[] => {
  return ShuffledCards();
};