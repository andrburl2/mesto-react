import React, { PureComponent } from 'react';

import Profile from '../Profile/Profile';
import Card from '../Card/Card';
import EditProfilePopup from '../PopupWIthForm/EditProfilePopup';
import AddCardPopup from '../PopupWIthForm/AddCardPopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import WithLoader from '../Loader/Loader';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';

import { api } from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const AddCardPopupWithLoader = WithLoader(AddCardPopup);
const EditProfilePopupWithLoader = WithLoader(EditProfilePopup);

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.confirmRef = React.createRef();

    this.state = {
      cards: [],
      isEditProfilePopupOpen: false,
      isAddCardPopupOpen: false,
      confirmPopupTitle: '',
      selectedCard: {
        link: '',
        name: '',
      },
    }
  }

  static contextType = CurrentUserContext;

  openEditPopup = () => {
    this.setState({
      isEditProfilePopupOpen: true
    });
  }

  openAddPopup = () => {
    this.setState({
      isAddCardPopupOpen: true
    });
  }

  openConfirmPopup = (title) => {
    this.setState({ confirmPopupTitle: title });    // передаем текст заголовка, что открывает попап

    return this.confirmRef.current.createPromise()  // через ref вызываем функцию, которая возвращает промис
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddCardPopupOpen: false,
      confirmPopupTitle: '',
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
        link: e.target.src,  // при нажатии на картинку, записываем ее ссылку и название в стейт
        name: e.target.alt,  // это откроет popup с нужной картинкой 
      },
    });
  }

  handleCardLike = (card) => {
    // проверяем есть ли id текущего пользователя в массив лайков и сохраняем, как boolean
    const isLiked = card.likes.some(el => el === this.context._id);

    // передаем его функции вторым аргументов
    api.changeLikeCardStatus(card._id, isLiked).then(newCard => {
      // создается новый массив, в котором старая карточка меняется на новую с обновленным значением лайка
      const newCards = this.state.cards.map(el => el._id === newCard.card._id ? newCard.card : el)

      this.setState({ cards: newCards });
    });
  }

  handleCardDelete = (id) => {
    this.openConfirmPopup('Вы действительно хотите удалить карточку?')
      .then(value => {
        if (value) {
          api.deleteCard(id).then(() => {
            // создается новый массив, без удаленной карточки
            const newCards = this.state.cards.filter(el => el._id !== id)
      
            this.setState({ cards: newCards });
          });
        }
      });
  }

  handleLogout = () => {
    this.openConfirmPopup('Вы действительно хотите выйти?')
      .then(value => {
        if (value) {
          this.props.logout();
        }
      });
  }

  addNewCard = (newCard) => {
    this.setState({ cards: [...this.state.cards, newCard] });    // добавляет новую карточку в стейт, передается в addCardPopup
  }

  getCards = () => {
    api.getCards()
      .then(data => this.setState({ cards: data.cards }));       // получаем с сервера карточки и записываем их в стейт
  }
  
  componentDidMount() {
    this.getCards();

    document.addEventListener('keydown', this.escClosePopup);    // добавлем eventListener для закрытия popup на esc
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escClosePopup); // очищаем eventListener для закрытия popup на esc
  }

  render() {
    const { getUserProfile } = this.props;

    return (
      <main>
        {/* передаем функции открытия попапов и выхода из профиля */}
        <Profile
          onOpenEditPopup={this.openEditPopup}
          onOpenAddPopup={this.openAddPopup}
          onLogout={this.handleLogout}
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
        <AddCardPopupWithLoader     isOpen={this.state.isAddCardPopupOpen}     onClose={this.closeAllPopups} addNewCard={this.addNewCard}    />

        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />

        <ConfirmPopup title={this.state.confirmPopupTitle} onClose={this.closeAllPopups} ref={this.confirmRef} />
      </main>
    )
  }
};

export default Main;