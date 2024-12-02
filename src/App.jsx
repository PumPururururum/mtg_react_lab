import "./App.css";
import { CardList } from "./components/CardList.jsx";
import { DeckPanel } from "./components/DeckPanel.jsx";
import { StatisticsPanel } from "./components/StatisticsPanel.jsx";

function App() {
  return (
    <>
      <header>
        <h1>MTG Deck Builder</h1>
      </header>
      <main className="main">
        
        <DeckPanel>
          {(AddToDeck) => <CardList AddToDeck={AddToDeck} />} 
        </DeckPanel>
        <StatisticsPanel />
      </main>
    </>
  );
}
//15 cardList делается ребенком addToDeck, 
//поэтому отображается снизу его, не знаю как подругому передавать функцию или отображать по другому
export default App;
