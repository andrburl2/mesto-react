import { React, PureComponent } from 'react';

import Profile from '../Profile/Profile';
import Card from '../Card/Card';

class Main extends PureComponent {
  render() {
    const { cards, onOpenEditPopup, onOpenAddPopup, onCardClick, onCardLike, onCardDelete } = this.props;

    return (
      <main>
        <Profile
          onOpenEditPopup={onOpenEditPopup}
          onOpenAddPopup={onOpenAddPopup}
        />
  
        <div className='card__container section'>
          {/* Перебираем массив и создаем карточку за каждый элемент */}
          
          {cards.map(el => {
            return (
              <Card
                card={el}
                key={el._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })}
        </div>
      </main>
    )
  }
};

export default Main;