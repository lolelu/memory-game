import React from "react";
import { Card as CardType } from "@/lib/cards";
import Image from "next/image";

interface CardProps {
  card: CardType;
  onFlip: (card: CardType) => void;
}

const Card = ({ card, onFlip }: CardProps) => {
  const [isFlippedUp, setIsFlippedUp] = React.useState(false);

  const handleClick = () => {
    if (!isFlippedUp) {
      onFlip(card);
    }
  };

  card.flipUp = () => {
    setIsFlippedUp(true);
  };
  card.flipDown = () => {
    setIsFlippedUp(false);
  };
  // Add this useEffect to update the card's flip function
  // React.useEffect(() => {

  // }, []);

  return (
    <div
      className="md:w-36 md:h-40 w-24 h-28 grid grid-cols-1 grid-rows-1 select-none  rounded-md group hover:scale-105 transform duration-200 cursor-pointer  transition-all  "
      onClick={handleClick}
    >
      <div
        className={`bg-red-100 border-4 row-start-1 col-start-1 transform duration-500 transition-all flex items-center rounded-md  justify-stretch ${
          isFlippedUp ? "scale-x-100 delay-500" : "scale-x-0"
        }`}
      >
        <div>
          <Image
            src={card.image}
            alt={card.id.toString()}
            className={`object-cover `}
            width={144}
            height={160}
            loading="eager"
          />
        </div>
      </div>

      <div
        className={`  border-4 row-start-1 col-start-1   transform duration-500 transition-all ${
          !isFlippedUp ? "scale-x-100 delay-500" : "scale-x-0 "
        } bg-gradient-to-br from-blue-400 to bg-purple-600  `}
      ></div>
    </div>
  );
};

export default Card;
