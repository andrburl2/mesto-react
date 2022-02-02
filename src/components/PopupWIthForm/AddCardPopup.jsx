import React, { PureComponent } from 'react';
import './popupWithForm.css';

import { api } from '../../utils/api';
import validate from '../../utils/validation';

class AddCardPopup extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      link: '',
      errors: {
        title: '',
        link: '',
      },
      isFormValid: false,
      message: '',
    }
  }

  submitForm = (e) => {
    e.preventDefault();

    this.props.toggleLoader();
    api.addCard(this.state.title, this.state.link)
      .then(data => {
        // если ответ пришел с 201 статусом, то вызовется функция добавления карточки и закроется попап
        if (data.status === 201) {
          this.props.addNewCard(data.card);
          this.closePopup();
          return
        }

        // иначе выведется сообщение
        this.setState({ message: data.message, isFormValid: false, });
      })
      .finally(() => this.props.toggleLoader());
  }

  closePopup = () => {
    // вызывается функция закрытия попап из пропсов и очищаются все значения
    this.props.onClose();

    this.setState({
      title: '',
      link: '',
      errors: {
        title: '',
        link: '',
      },
      isFormValid: false,
      message: '',
    });
  }
  
  handleChange = (e) => {
    // создается копия ошибок из стейта, затем в зависимости от имени input
    // свойство this.state.errors с тем же именем получает текст ошибки
    const validity = validate(e.target);
    const errors = this.state.errors;
    errors[e.target.name] = validity.error;

    // при вводе символа записывается значение поля, обновляются ошибки,
    // валидность всей формы для включения кнопки и очищается сообщение с сервера
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors,
      isFormValid: validity.isFormValid,
      message: '',
    })
  }

  render() {
    const { isOpen, children, isLoading } = this.props;

    return (
      <div className={ `popup ${isOpen ? 'popup_is-opened' : ''}` }>
        <div className='popup__content'>
          <button className='popup__close' onClick={this.closePopup} title='Закрыть окно'></button>
          <h3 className='popup__title'>Новое место</h3>

          <form className='popup__form' name='addCard' onSubmit={this.submitForm}>
            <input
              className='input popup__input'
              aria-label='Название'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              required
              type='text'
              minLength='2'
              maxLength='30'
              placeholder='Название'
            />
            <p className='popup__error'>{this.state.errors.title}</p>

            <input
              className='input popup__input'
              aria-label='Ссылка на картинку'
              name='link'
              value={this.state.link}
              onChange={this.handleChange}
              required
              type='url'
              placeholder='Ссылка на картинку'
            />
            <p className='popup__error'>{this.state.errors.link}</p>

            { /* параграф для ответа с сервера */ }
            <p className='popup__message'>{this.state.message}</p>

            <button
              className={`button popup__button ${this.state.isFormValid ? 'popup__button_active' : ''} ${isLoading ? 'hidden' : ''}`}
              type='submit'
              disabled={!this.state.isFormValid}
            >
              Добавить
            </button>

            { /* место лоадера */ }
            {children}
          </form>
        </div>
      </div>
    )
  }
}

export default AddCardPopup;