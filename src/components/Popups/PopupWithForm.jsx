import { React, Component } from 'react';
import './popupWithForm.css';

class PopupWithForm extends Component {
  render() {
    const { popup, onClose } = this.props;

    return (
      <div className={ `popup ${popup.name !== '' ? 'popup_is-opened' : ''}` }>
        <div className='popup__content'>
          <button className='popup__close' onClick={onClose} title='Закрыть окно'></button>
          <h3 className='popup__title'>{popup.title}</h3>

          <form className='popup__form' name={popup.name}>
            {popup.children}
          </form>
        </div>
      </div>
    )
  }
}

export default PopupWithForm;
