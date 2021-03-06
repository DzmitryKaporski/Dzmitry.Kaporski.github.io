import "./App.css";
import AddCard from './components/AddCard';
import Context from './Context';
import CardsList from './components/CardsList';
import React, { useState } from "react";
import SearchFilterSort from './components/SearchFilterSort';

function App() {
  const [cards, setCards] = React.useState([
    {
      id: 1, picture: "https://clck.ru/Pf4eW", name: 'React', article: 'A73', count: '48',
      price: 107, creationDate: '2025-01-01', priceSegment: 'cheap', description: 'program',
    },
    {
      id: 2, picture: "https://clck.ru/Pf4eW", name: 'React', article: 'A88', count: '1',
      price: 187, creationDate: '2025-01-01', priceSegment: 'cheap', description: 'program',
    },
    {
      id: 3, picture: "https://clck.ru/PrjwR", name: 'JavaS', article: 'A05', count: '7',
      price: 150, creationDate: '2027-02-01', priceSegment: 'premium', description: '',
    },
    {
      id: 4, picture: "https://clck.ru/PrjwR", name: 'JavaS', article: 'A07', count: '1',
      price: 77, creationDate: '2020-02-01', priceSegment: 'premium', description: '',
    },
    {
      id: 5, picture: "https://clck.ru/Pg3vc", name: 'Vue.js', article: 'A06', count: '9',
      price: 180, creationDate: '2025-01-01', priceSegment: 'optimal', description: 'program',
    },
    {
      id: 6, picture: "https://clck.ru/Pg3vc", name: 'Vue.js', article: 'A02', count: '1',
      price: 105, creationDate: '2024-03-01', priceSegment: 'optimal', description: 'program',
    },
    {
      id: 7, picture: "https://clck.ru/Pg3qZ", name: 'Angular', article: 'A01', count: '55',
      price: 141, creationDate: '2021-01-05', priceSegment: 'cheap', description: 'program',
    },
    {
      id: 8, picture: "https://clck.ru/Pg3qZ", name: 'Angular', article: 'A99', count: '15',
      price: 101, creationDate: '2021-01-05', priceSegment: 'cheap', description: 'program',
    },
  ]);

  const editCard = (id, inputName, inputArticle, inputCount, inputPrice, inputPicture, today, dd, mm, yyyy,) => {
    const updateCards = cards.map((card) =>
      card.id === id ?
        {
          ...card, name: inputName, article: inputArticle, picture: inputPicture,
          count: inputCount, price: inputPrice, creationDate: today = yyyy + '-' + mm + '-' + dd
        } : card
    )
    setCards(updateCards);
  };

  function removeCard(id) {
    setCards(cards.filter(card => card.id !== id));
  };

  function addCard(id, name, article, count, price, creationDate, priceSegment, description, picture) {
    setCards(
      cards.concat([
        {
          id: Date.now(),
          picture,
          name,
          article,
          count,
          price,
          creationDate,
          priceSegment,
          description,
        }
      ])
    )
  };

  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('alphabet');

  const getCard = (searchValue) => { setSearchValue(searchValue) };
  const sortCards = (sortValue) => { setSortValue(sortValue) };

  const [stateCheap, setFilterCheap] = useState(true);
  const [stateOptimal, setFilterOptimal] = useState(true);
  const [statePremium, setFilterPremium] = useState(true);

  const filterCardsCheap = (stateCheap) => { setFilterCheap(stateCheap) };
  const filterCardsOptimal = (stateOptimal) => { setFilterOptimal(stateOptimal) };
  const filterCardsPremium = (statePremium) => { setFilterPremium(statePremium) };

  const getSortedCards = (sortValue) => {
    let sortedCards = sortValue === 'alphabet' ? cards.sort((a, b) => a.name > b.name ? 1 : -1) :
      sortValue === 'price' ? cards.sort((a, b) => b.price - a.price) :
        sortValue === 'count' ? cards.sort((a, b) => +b.count - +a.count) :
          sortValue === 'date' ? cards.sort((a, b) => a.creationDate > b.creationDate ? -1 : null) : cards;
    return sortedCards;
  }

  const getFilteredCards = (cards) => {
    let filtredCards = stateCheap && !stateOptimal && !statePremium ? cards.filter(card => card.priceSegment === 'cheap') :
      stateOptimal && !stateCheap && !statePremium ? cards.filter(card => card.priceSegment === 'optimal') :
        statePremium && !stateOptimal && !stateCheap ? cards.filter(card => card.priceSegment === 'premium') :
          stateCheap && stateOptimal && !statePremium ? cards.filter(card => card.priceSegment !== 'premium') :
            stateOptimal && statePremium && !stateCheap ? cards.filter(card => card.priceSegment !== 'cheap') :
              stateCheap && statePremium && !stateOptimal ? cards.filter(card => card.priceSegment !== 'optimal') : cards;
    return filtredCards;
  }

  const getCardsSortedFiltred = getFilteredCards(getSortedCards(sortValue));
  const getCardSearch = getCardsSortedFiltred.filter(card => card.name.toLowerCase().startsWith(searchValue.toLowerCase()));

  return (
    <Context.Provider value={{ removeCard }}>
      <div className='app-wrapper'>
        <div className="app-search-filter-sort-add-wrap">
          <SearchFilterSort
            sortCards={sortCards}
            filterCardsCheap={filterCardsCheap}
            filterCardsOptimal={filterCardsOptimal}
            filterCardsPremium={filterCardsPremium}
            getCard={getCard}
          />
          <AddCard onCreate={addCard} />
        </div>
        <div className="app-card-list">
          {!stateCheap && !stateOptimal && !statePremium ? <h1 className='message-for-user-text_white'>There are no cards to display !!!</h1> :
            <CardsList editCard={editCard} cards={searchValue ? getCardSearch : getCardsSortedFiltred} />}

        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
