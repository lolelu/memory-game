//Generate an array of 16 cards, 8 pairs of 2 cards, each pair has the same image from unsplash

//Generate a random int
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const GenerateCards = (): Card[] => {
  const cards = [];

  //generate a random int between 1 and 200 to randomize the images
  const randomAdd = randomInt(20, 200);

  //generate 8 pairs of cards
  for (let i = 0; i < 8; i++) {
    const card: Card = {
      id: i,
      //   image: `https://source.unsplash.com/featured/?nature,water,${i}`,
      image: `https://picsum.photos/seed/${i + randomAdd}/144/160`,
      flipUp: () => {},
      flipDown: () => {},
    };
    cards.push(card);
    cards.push({ ...card });
  }
  return cards;
};

// return shuffled cards
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

// export the cards, already shuffled adn ready to be used
export const Cards = (): Card[] => {
  return ShuffledCards();
};

// Card interface
export interface Card {
  id: number;
  image: string;
  flipUp: () => void;
  flipDown: () => void;
}
