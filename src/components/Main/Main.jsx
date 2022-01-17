import { React, PureComponent } from 'react';

import Profile from '../Profile/Profile';
import Card from '../Card/Card';
import EditProfilePopup from '../PopupWIthForm/EditProfilePopup';
import AddPlacePopup from '../PopupWIthForm/AddPlacePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import WithLoader from '../Loader/Loader';

import { api } from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const AddPlacePopupWithLoader = WithLoader(AddPlacePopup);
const EditProfilePopupWithLoader = WithLoader(EditProfilePopup);

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

  escClosePopup = (e) => {
    // закрытие попапов на esc
    if (e.keyCode === 27) {
      this.closeAllPopups();
    }
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
    // проверяем есть ли id текущего пользователя в массив лайков и записываем, как boolean
    const isLiked = card.likes.some(el => el === this.context._id);

    // передаем его функции вторым аргументов
    api.changeLikeCardStatus(card._id, isLiked).then(newCard => {
      // создается новый массив, в котором старая карточка меняется на новую, без лайка
      const newCards = this.state.cards.map(el => el._id === newCard.card._id ? newCard.card : el)

      this.setState({ cards: newCards });
    });
  }

  handleCardDelete = (id) => {
    api.deleteCard(id).then(() => {
      // создается новый массив, без удаленной карточки
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
    document.addEventListener('keydown', this.escClosePopup);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escClosePopup);
  }

  render() {
    const { onLogout, getUserProfile, } = this.props;

    return (
      <main>
        {/* передаем функции открытия попапов и выхода из профиля */}
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

        {/* передаем в попапы свойство, отвечающее за открытие, функцию для их закрытия,
        функции для обноления профиля и создания новой карточки */}
        <EditProfilePopupWithLoader isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} getUserProfile={getUserProfile} />
        <AddPlacePopupWithLoader isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} addNewCard={this.addNewCard} />

        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
      </main>
    )
  }
};

export default Main;