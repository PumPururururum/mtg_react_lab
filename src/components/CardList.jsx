import { useEffect, useState } from "react";
import { Mtg } from "../api/mtg.js";

import { DeckPanel } from "./DeckPanel.jsx";

function CardList() {
  const [cards, setCards] = useState([]); // Список карт
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);


  useEffect(() => {
    // Загружаем карты при первом рендере
    const mtg = new Mtg();
    //setLoading(true);
    mtg.loadCards()
      .then((loadedCards) => {
        setCards(loadedCards);
      })
  }, []);

  const handleSearch = () => {
    // Поиск карт по имени
    if (!searchQuery.trim()) return;
    const mtg = new Mtg();
    //setLoading(true);
    mtg.searchCardsByName(searchQuery)
      .then((foundCards) => {
        setCards(foundCards);
      })
      //.finally(() => setLoading(false));
  };
  
  const CardClick = (card) => {
    setSelectedCard(card); // Устанавливаем выбранную карту
  };

  return (
    <div id="menu">
      <h2>Cards</h2>
      <div id="searchContainer">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onInput={(e) => {setSearchQuery(e.target.value); handleSearch()}}
        />
      </div>
      <div id="listContainer">
        {  (
          <ul>
            {cards.map((card) => (
              <li key={card.id}
                onClick={() => CardClick(card)} // Добавляем обработчик клика
                style={{ cursor: "pointer" }}>
                {card.name}</li>
            ))}
          </ul>
        )}
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
          <button onClick={() => AddToDeck(selectedCard)}>Добавить в колоду</button>
        </div>
      )}
    </div>
  );
}

export { CardList };
