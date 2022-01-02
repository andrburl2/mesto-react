import { React, PureComponent} from 'react';

import './profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class Profile extends PureComponent {
  static contextType = CurrentUserContext;
  
  render() {
    const { onOpenEditPopup, onOpenAddPopup} = this.props;

    return (
      <div className='profile section'>
        <img className='profile__photo' src={this.context.avatar} alt='Ваш аватар' />
        
        <div className='profile__data'>
          <h1 className='profile__name'>{this.context.name}</h1>
          <p className='profile__job'>{this.context.about}</p>
        </div>

        <button className='button profile__button_type_edit' title='Редактировать профиль' onClick={onOpenEditPopup}></button>
        <button className='button profile__button_type_add' title='Добавить новую карточку' onClick={onOpenAddPopup}>+</button>
      </div>
    )
  }
}

export default Profile;