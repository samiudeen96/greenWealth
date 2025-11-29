import React from "react";

const ReviewCards = ({ cards }) => {
  // Split cards into rows: 2 cards, then 1 card, repeat
  const rows = [];
  let i = 0;
  while (i < cards.length) {
    // Take 2 cards for the first row
    const firstRow = cards.slice(i, i + 2);
    if (firstRow.length) rows.push(firstRow);
    i += 2;

    // Take 1 card for the second row
    const secondRow = cards.slice(i, i + 1);
    if (secondRow.length) rows.push(secondRow);
    i += 1;
  }

  return (
    <div className="flex flex-col gap-50">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-50 ${
            row.length === 1 ? "justify-center" : "justify-between"
          }`}
        >
          {row.map((card, idx) => (
            <div
              key={idx}
              className={`p-5 bg-blue-200 w-96 ${
                row.length === 1 ? "w-[49%] sm:w-[49%]" : ""
              }`}
            >
              {card.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReviewCards;
