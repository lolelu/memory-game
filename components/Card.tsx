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

  // Add this useEffect to update the card's flip function
  React.useEffect(() => {
    card.flipUp = () => {
      setIsFlippedUp(true);
    };
    card.flipDown = () => {
      setIsFlippedUp(false);
    };
  }, []);

  return (
    <div
      className="w-36 h-40 flex select-none  rounded-md border-4 group hover:rotate-3 transform duration-200 cursor-pointer  transition-all  "
      onClick={handleClick}
    >
      <div
        className={`bg-red-100 basis-full flex items-center rounded-md  justify-stretch ${
          isFlippedUp ? " " : "hidden"
        }`}
      >
        <div>
          <Image
            src={card.image}
            alt={card.id.toString()}
            className={`object-cover`}
            width={144}
            height={160}
            loading="eager"
          />
        </div>
      </div>

      <div
        className={` basis-full ${
          !isFlippedUp ? " " : "hidden"
        } bg-gradient-to-br from-blue-400 to bg-purple-600  `}
      ></div>
    </div>
  );
};

export default Card;
