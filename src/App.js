import React, {useState} from "react";
import './App.css';

function App() {
  const defaultCards = [
    {id: 1, order: 1, text: "Card 1"},
    {id: 3, order: 3, text: "Card 3"},
    {id: 2, order: 2, text: "Card 2"},
    {id: 4, order: 4, text: "Card 4"},
  ];
  const [cardList, setCardList] = useState(defaultCards);
  const [currentCard, setCurrentCard] = useState(null);

  const sortList = (a, b) => {
    if(a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  function dragStartHandler(e, card) {
    setCurrentCard(card);
  }

  function dragLeaveHandler(e) {
    e.target.style.background = "white";
  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.target.style.background = "lightGrey";
  }

  function dropHandler(e, card) {
    e.preventDefault()
    setCardList(cardList.map(c => {
      if(c.id === card.id) {
          return {...c, order: currentCard.order}
      }
      if(c.id === currentCard.id) {
        return {...c, order: card.order}
      }
      return c
    }))
    e.target.style.background = "white";
  }

  return (
    <div className="app">
      {cardList.sort(sortList).map(card =>
          <div key={card.id}
              className={'card'}
               draggable={true}
               onDragStart={e => dragStartHandler(e, card)}
               onDragLeave={e => dragLeaveHandler(e)}
               onDragOver={e => dragOverHandler(e)}
               onDrop={e => dropHandler(e, card)}
              >
            {card.text}
          </div>
      )}
    </div>
  );
}

export default App;
