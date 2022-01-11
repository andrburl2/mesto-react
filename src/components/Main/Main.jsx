import { React, PureComponent } from 'react';

import Profile from '../Profile/Profile';
import Card from '../Card/Card';
import EditProfilePopup from '../Popups/EditProfilePopup';
import AddPlacePopup from '../Popups/AddPlacePopup';
import ImagePopup from '../ImagePopup/ImagePopup';

import { api } from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class Main extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      cards: [],
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: {
        link: '',
        name: '',
      },
    }
  }

  static contextType = CurrentUserContext;

  onOpenEditPopup = () => {
    this.setState({
      isEditProfilePopupOpen: true
    });
  }

  onOpenAddPopup = () => {
    this.setState({
      isAddPlacePopupOpen: true
    });
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: {
        link: '',
        name: '',
      },
    });
  }

  handleCardClick = (e) => {
    this.setState({
      selectedCard: {
        link: e.target.src,
        name: e.target.alt,
      },
    });
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(el => el === this.context._id);

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

  addNewCard = (newCard) => {
    this.setState({ cards: [...this.state.cards, newCard] });
  }

  getCards = () => {
    api.getCards()
      .then(data => this.setState({ cards: data.cards }));
  }

  componentDidMount() {
    this.getCards();
  }

  render() {
    const { onLogout, updateProfile } = this.props;

    return (
      <main>
        <Profile
          onOpenEditPopup={this.onOpenEditPopup}
          onOpenAddPopup={this.onOpenAddPopup}
          onLogout={onLogout}
        />
  
        <div className='card__container section'>
          {/* Перебираем массив и создаем карточку за каждый элемент */}
          
          {this.state.cards.map(el => {
            return (
              <Card
                card={el}
                key={el._id}
                onCardClick={this.handleCardClick}
                onCardLike={this.handleCardLike}
                onCardDelete={this.handleCardDelete}
              />
            )
          })}
        </div>

        <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} updateProfile={updateProfile} />
        <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} addNewCard={this.addNewCard} />

        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
      </main>
    )
  }
};

export default Main;