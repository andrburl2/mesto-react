import React, { PureComponent } from 'react';
import './confirmPopup.css';

class ConfirmPopup extends PureComponent {
  constructor(props) {
    super(props);

    this.confirmButton = React.createRef(); // кнопка подтверждения
    this.cancelButton = React.createRef();  // кнопка отмены
  }

  createPromise = async () => {
    return new Promise((resolve, reject) => {
      // через ref вешаем обработчики событий на кнопки, которые разрешают промис с true или false
      this.confirmButton.current.addEventListener('click', () => {
        resolve(true)
      });

      this.cancelButton.current.addEventListener('click', () => {
        resolve(false)
      });
    })
  }

  render() {
    const { title, onClose } = this.props;

    return (
      <div className={`confirm ${title ? 'confirm__is-openned' : ''}`}>
        <div className='confirm__content'>
          <h2 className='confirm__title'>{title}</h2>

          <div className='confirm__button-row'>
            <button className='button confirm__button confirm__button_type_cancel' onClick={onClose} ref={this.cancelButton}>Назад</button>
            <button className='button confirm__button confirm__button_type_confirm' onClick={onClose} ref={this.confirmButton}>Подтвердить</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmPopup;