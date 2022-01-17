import { React, PureComponent } from 'react';
import './imagePopup.css';

class ImagePopup extends PureComponent {
  closePopup = (e) => {
    // если кликнуть по любой области кроме картинки, то попап закроется
    if (!e.target.className.includes('popup-image__img')) {
      this.props.onClose();
    }
  }

  render() {
    const { card } = this.props;

    return (
      <div className={`popup-image ${card.link !== '' ? 'popup-image__is-openned' : ''}`} onClick={this.closePopup} >
        <div className='popup-image__content'>
          <button className='popup__close' title='Закрыть окно'></button>
          <img className='popup-image__img' src={card.link} alt={card.name} />
        </div>
      </div>
    )
  }
}

export default ImagePopup;