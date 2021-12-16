import './profile.css';
import avatar from '../../images/avatar.jpg'

function Profile(props) {
  return (
    <div className='profile section'>
      <img className='profile__photo' src={avatar} alt='Ваш аватар' title='Изменить аватар' data-popup={'avatarPopup'} onClick={props.onOpenPopup} />
      <div className='profile__data'>
        <h1 className='profile__name'>Жак Ив Кусто</h1>
        <button className='button profile__button_type_edit' title='Редактировать профиль' data-popup={'editPopup'} onClick={props.onOpenPopup}></button>
        <p className='profile__job'>Моряк, исследователь</p>
      </div>
      <button className='button profile__button_type_add' title='Добавить новую карточку' data-popup={'newPopup'} onClick={props.onOpenPopup}>+</button>
    </div>
  )
}

export default Profile;
