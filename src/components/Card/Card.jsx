import react from 'react';
import './card.css';

class Card extends react.Component {
  render() {
    const { card, onCardClick } = this.props;

    return (
      <div className='card'>
        <div className='card__content'>
          <img className='card__img' src={card.link} alt={card.name} onClick={onCardClick} />
          <button className='card__delete-icon' onClick={this.remove}></button>
        </div>
        <div className='card__description'>
          <h3 className='card__name'>{card.name}</h3>

          <div className="card__like-container">
            <button className='card__like-icon' onClick={this.like}></button>
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </div>
    )
  }
  
  like(e) {
    e.target.classList.toggle('card__like-icon_liked')
  }
  
  remove(e) {
    e.target.closest('.card').remove();
  }
}

export default Card;
