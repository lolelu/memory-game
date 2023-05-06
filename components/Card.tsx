import React from "react";
import { Card as CardType } from "@/lib/cards";
import Image from "next/image";

interface CardProps {
  card: CardType;
  onFlip: (card: CardType) => void;
}

const Card = ({ card, onFlip }: CardProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onFlip(card);
    }
  };

  // Add this useEffect to update the card's flip function
  React.useEffect(() => {
    card.flip = () => {
      setIsFlipped((prev) => !prev);
    };
  }, []);

  return (
    <div className="w-24 h-40 flex select-none" onClick={handleClick}>
      <div
        className={`bg-red-100 basis-full flex items-center  justify-stretch ${
          isFlipped ? " " : "hidden"
        }`}
      >
        <div>
          <Image
            src={card.image}
            alt={card.id.toString()}
            className={`object-cover w-24 h-40`}
            width={96}
            height={160}
            loading="eager"
          />
        </div>
      </div>

      <div className={`bg-blue-100 basis-full ${!isFlipped ? " " : "hidden"}`}>
        Card Back
      </div>
    </div>
  );
};

export default Card;
