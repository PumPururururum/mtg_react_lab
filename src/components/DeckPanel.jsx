import { useState } from "react";

function DeckPanel({ children }) {
  const [deck, setDeck] = useState([]); // Управление колодой

  const AddToDeck = (card) => {
    setDeck((prevDeck) => {
      const existingCard = prevDeck.find((c) => c.id === card.id);
      if (existingCard) {
        if (
          existingCard.count <
          (card.type === "Land" ? Infinity : card.rarity === "Mythic" ? 1 : 4)
        ) {
          return prevDeck.map((c) =>
            c.id === card.id ? { ...c, count: c.count + 1 } : c
          );
        }
        return prevDeck; // Лимит достигнут
      } else {
        return [...prevDeck, { ...card, count: 1 }];
      }
    });
  };

  const removeFromDeck = (card) => {
    setDeck((prevDeck) => {
      const cardIndex = prevDeck.findIndex((c) => c.id === card.id);
      if (cardIndex === -1) return prevDeck;

      const updatedDeck = [...prevDeck];
      if (updatedDeck[cardIndex].count > 1) {
        updatedDeck[cardIndex].count--;
      } else {
        updatedDeck.splice(cardIndex, 1);
      }
      return updatedDeck;
    });
  };

  return (
    <div className="content">
      <h2>Deck</h2>
      {deck.length === 0 ? (
        <p>Колода пуста</p>
      ) : (
        <div id="deckDisplay">
          {deck.map((card) => (
            <div
              key={card.id}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={card.imageUrl}
                alt={card.name}
                style={{ width: "100px", height: "auto", marginRight: "10px" }}
              />
              <div>
                <p>{card.name}</p>
                <p>Количество: {card.count}</p>
                <button
                  onClick={() => removeFromDeck(card)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#ff4d4d",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {children(AddToDeck)}
    </div>
  );
}

export { DeckPanel };
