import "./App.css";
import { CardList } from "./components/CardList.jsx";
import { DeckPanel } from "./components/DeckPanel.jsx";
import { StatisticsPanel } from "./components/StatisticsPanel.jsx";
import { useState } from "react";

function App() {
  const [deck, setDeck] = useState([]);
  console.log(deck)
  console.log(setDeck)
  return (
    <>
      <header>
        <h1>MTG Deck Builder</h1>
      </header>
      <main className="main">
        <DeckPanel
          deck={deck}
          setDeck = {setDeck}>
             {(AddToDeck) => <CardList AddToDeck={AddToDeck} /> } 
        </DeckPanel>  
          <StatisticsPanel deck={deck}/>
      </main>
    </>
  );
}
export default App;
