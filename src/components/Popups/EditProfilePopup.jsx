import { React, PureComponent } from 'react';
import './popupWithForm.css';

import { api } from '../../utils/api';
import validate from '../../utils/validation';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class EditProfilePopup extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      about: '',
      avatar: '',
      errors: {
        name: '',
        about: '',
        avatar: '',
      },
      isFormValid: true,
      message: '',
    }
  }

  static contextType = CurrentUserContext;

  submitForm = (e) => {
    e.preventDefault();

    api.updateProfile(this.state.name, this.state.about, this.state.avatar)
      .then(data => {
        if (data.status === 200) {
          this.props.updateProfile();
          this.closePopup();
          return
        }

        this.setState({ message: data.message });
      });
  }

  closePopup = () => {
    this.props.onClose();
    
    this.setState({
      errors: {
        name: '',
        about: '',
        avatar: '',
      },
      isFormValid: true,
      message: '',
    });
  }
  
  handleChange = (e) => {
    const validity = validate(e.target);
    const errors = this.state.errors;
    errors[e.target.name] = validity.error;

    this.setState({
      [e.target.name]: e.target.value,
      errors: errors,
      isFormValid: validity.isFormValid,
      message: '',
    })
  }

  componentDidUpdate(prevProps) {
    if (!(prevProps === this.props)) {
      this.setState({
        name: this.context.name,
        about: this.context.about,
        avatar: this.context.avatar,
      })
    }
  }

  render() {
    const { isOpen } = this.props;

    return (
      <div className={ `popup ${isOpen ? 'popup_is-opened' : ''}` }>
        <div className='popup__content'>
          <button className='popup__close' onClick={this.closePopup} title='Закрыть окно'></button>
          <h3 className='popup__title'>Редактировать профиль</h3>

          <form className='popup__form' name='edit' onSubmit={this.submitForm}>
            <input
              className='input popup__input'
              aria-label='Имя'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
              type='text'
              minLength='2'
              maxLength='30'
              placeholder='Имя'
            />
            <p className='popup__error'>{this.state.errors.name}</p>

            <input
              className='input popup__input'
              aria-label='Занятие'
              name='about'
              value={this.state.about}
              onChange={this.handleChange}
              required type='text'
              minLength='2'
              maxLength='30'
              placeholder='Занятие'
            />
            <p className='popup__error'>{this.state.errors.about}</p>

            <input
              className='input popup__input'
              aria-label='Ссылка на аватар'
              name='avatar'
              value={this.state.avatar}
              onChange={this.handleChange}
              required
              type='url'
              placeholder='Ссылка на аватар'
            />
            <p className='popup__error'>{this.state.errors.avatar}</p>

            <p className='popup__message'>{this.state.message}</p>

            <button
              className={`button popup__button ${this.state.isFormValid ? 'popup__button_active' : ''}`}
              type='submit'
              disabled={!this.state.isFormValid}
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default EditProfilePopup;
