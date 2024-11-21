

import { useEffect, useState } from "react";



function DeckPanel() {
    
 
   

    const AddToDeck = (card) => {
        console.log("Добавлено в колоду:", card.name); // Заглушка, замените на реальную логику
      };
   return <div className="content">
        <div id="cardsContainer">
            <h1 className='contentHeader'>
            
            </h1>
        </div>
    </div>
}

export {DeckPanel}