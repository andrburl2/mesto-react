import { React, PureComponent } from 'react';
import './popupWithForm.css';

class AddPlacePopup extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      link: '',
    }
  }

  submit = (e) => {
    e.preventDefault();
    
    this.props.onAddCard(this.state.title, this.state.link);
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <div className={ `popup ${isOpen ? 'popup_is-opened' : ''}` }>
        <div className='popup__content'>
          <button className='popup__close' onClick={onClose} title='Закрыть окно'></button>
          <h3 className='popup__title'>Новое место</h3>

          <form className='popup__form' name='addPlace' onSubmit={this.submit}>
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
            <p className='popup__error'></p>

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
            <p className='popup__error'></p>

            <button className='button popup__button popup__button_active' type='submit'>Добавить</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddPlacePopup;
