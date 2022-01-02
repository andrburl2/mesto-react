import { React, PureComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Main from './Main/Main';

import EditProfilePopup from './Popups/EditProfilePopup';
import AddPlacePopup from './Popups/AddPlacePopup';
import ImagePopup from './ImagePopup/ImagePopup';
import Join from './Join/Join';

import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: {
        link: '',
        name: '',
      },
      currentUser: {},
      cards: [],
    }
  }

  onOpenEditPopup = () => {
    this.setState({
      isEditProfilePopupOpen: true
    })
  }

  onOpenAddPopup = () => {
    this.setState({
      isAddPlacePopupOpen: true
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: {
        link: '',
        name: '',
      },
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

  getProfile = () => {
    api.getProfile()
      .then(data => this.setState({ currentUser: data }));
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(el => el === this.state.currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then(newCard => {
      const newCards = this.state.cards.map(el => el._id === newCard.card._id ? newCard.card : el)

      this.setState({ cards: newCards });
    });
  }

  handleCardDelete = (id) => {
    api.deleteCard(id).then(() => {
      const newCards = this.state.cards.filter(el => el._id !== id)

      this.setState({ cards: newCards });
    });
  }

  handleUpdateUser = (name, about, avatar) => {
    api.updateProfile(name, about, avatar)
      .then(data => {
        this.setState({ currentUser: data.user });
        this.closeAllPopups();
      });
  }

  handleAddCard = (title, link) => {
    api.addCard(title, link)
      .then(res => {
        this.setState({ cards: [...this.state.cards, res.card] });

        this.closeAllPopups();
      })
  }

  componentDidMount() {
    this.getProfile();

    api.getCards()
      .then(data => this.setState({ cards: data.cards }));
  }
  

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header />
        
        <Routes>
          <Route 
            path='/'
            exact
            element=
            {
              <>
                <Main
                  onOpenEditPopup={this.onOpenEditPopup}
                  onOpenAddPopup={this.onOpenAddPopup}
                  onCardClick={this.onCardClick}
                  onCardLike={this.handleCardLike}
                  onCardDelete={this.handleCardDelete}
                  cards={this.state.cards}
                />

                
                

                <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} />
                <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddCard={this.handleAddCard} />

                <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
              </>
            }  
          >
          </Route>
          <Route
            path='/join'
            element={<Join />}
          ></Route>
        </Routes>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;