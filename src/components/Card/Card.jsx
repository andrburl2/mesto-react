import React, { PureComponent } from 'react';
import './card.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class Card extends PureComponent {
  static contextType = CurrentUserContext;

  render() {
    const { card, onCardClick, onCardLike, onCardDelete, } = this.props;

    // проверяем есть ли id текущего пользователя в массив лайков
    const isLiked = card.likes.some(el => el === this.context._id);
    // проверяем владельца карточки(id) с id текущего пользователя
    const canDelete = card.owner === this.context._id;

    return (
      <div className='card'>
        <div className='card__content'>
          <img className='card__img' src={card.link} alt={card.name} onClick={onCardClick} />
          { canDelete ?
            <button className='card__delete-icon' onClick={() => onCardDelete(card._id)}></button>
            : '' 
          }
        </div>
        
        <div className='card__description'>
          <h3 className='card__title'>{card.title}</h3>

          <div className="card__like-container">
            <button
              className={`card__like-icon ${isLiked ? 'card__like-icon_liked' : ''}`}
              onClick={() => onCardLike(card)}
            ></button>
            
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;