import { useEffect, useState } from "react";
import { Mtg } from "../api/mtg.js";

function CardList({ AddToDeck }) {
  const [cards, setCards] = useState([]); // Список карт
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const mtg = new Mtg();
    mtg.loadCards().then((loadedCards) => {
      setCards(loadedCards);
    });
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const mtg = new Mtg();
    mtg.searchCardsByName(searchQuery).then((foundCards) => {
      setCards(foundCards);
    });
  };

  const CardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div id="main">
      <div id="menu">
      <div className="menu">
        <h2>Cards</h2>
        <div id="searchContainer">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div id="listContainer">
          <ul>
            {cards.map((card) => (
              <li
                key={card.id}
                onClick={() => CardClick(card)}
                style={{ cursor: "pointer" }}
              >
                {card.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
      {selectedCard && (
        <div id="selectedCard">
          <h3>{selectedCard.name}</h3>
          {selectedCard.imageUrl && (
            <img
              src={selectedCard.imageUrl}
              alt={selectedCard.name}
              style={{ width: "200px", height: "auto" }}
            />
          )}
          <p>{selectedCard.text || "Описание отсутствует"}</p>
          <button onClick={() => AddToDeck(selectedCard)}>
            Добавить в колоду
          </button>
        </div>
      )}
    
    </div>
  );
}

export { CardList };
