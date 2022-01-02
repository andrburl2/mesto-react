import { React, PureComponent } from 'react';
import './popupWithForm.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class EditProfilePopup extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      about: '',
      avatar: '',
    }
  }

  static contextType = CurrentUserContext;

  submit = (e) => {
    e.preventDefault();

    this.props.onUpdateUser(this.state.name, this.state.about, this.state.avatar);
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidUpdate(prevProps ) {
    if (!(prevProps === this.props)) {
      this.setState({
        name: this.context.name,
        about: this.context.about,
        avatar: this.context.avatar,
      })
    }
  }

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <div className={ `popup ${isOpen ? 'popup_is-opened' : ''}` }>
        <div className='popup__content'>
          <button className='popup__close' onClick={onClose} title='Закрыть окно'></button>
          <h3 className='popup__title'>Редактировать профиль</h3>

          <form className='popup__form' name='edit' onSubmit={this.submit}>
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
            <p className='popup__error'></p>

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
            <p className='popup__error'></p>

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
            <p className='popup__error'></p>

            <button className='button popup__button popup__button_active' type='submit'>Сохранить</button>
          </form>
        </div>
      </div>
    )
  }
}

export default EditProfilePopup;
