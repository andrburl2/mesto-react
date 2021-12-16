import { Component } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';

import popupData from '../data/POPUP_DATA';
import initialCards from '../data/INITIAL_CARDS';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openPopup: {
        name: '',
        title: '',
        children: '',
      },
      selectedCard: {
        link: '',
        name: '',
      },
      cards: [],
    }
  }

  onOpenPopup = (e) => {
    this.setState({
      openPopup: popupData[e.target.dataset.popup],
    })
  }

  onCardClick = (e) => {
    this.setState({
      selectedCard: {
        link: e.target.src,
        name: e.target.alt,
      },
    });
  } 

  closeAllPopups = () => {
    this.setState({
      openPopup: {
        name: '',
        title: '',
        children: '',
      },
      selectedCard: {
        link: '',
        name: '',
      },
    })
  }

  render() {
    this.cards = initialCards;

    return (
      <>
        <Header />
        <Main
          onOpenPopup={this.onOpenPopup}
          onCardClick={this.onCardClick}
          cards={this.cards}
        />
        
        <PopupWithForm popup={this.state.openPopup} onClose={this.closeAllPopups} />

        <ImagePopup onClose={this.closeAllPopups} card={this.state.selectedCard} />
      </>
    );
  }
}

export default App;
