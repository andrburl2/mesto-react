import React from "react";
import './imagePopup.css';

class ImagePopup extends React.Component {
  render() {
    const { card, onClose } = this.props;

    return (
      <div className={ `popup-image ${card.link !== '' ? 'popup-image__is-openned' : ''}` }>
        <div className='popup-image__content'>
          <button className='popup__close' onClick={onClose} title='Закрыть окно'></button>
          <img className='popup-image__img' src={card.link} alt={card.name} />
        </div>
      </div>
    )
  }
}

export default ImagePopup;
