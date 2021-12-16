import React from 'react';

const popupData = {
  newPopup: {
    name: 'new',
    title: 'Новое место',
    children: (
      <>
        <input className='popup__input' aria-label='Имя' name='editName' required type='text' minLength='2' maxLength='30' placeholder='Имя' />
        <p className='popup__error popup__error_editName'></p>
        <input className='popup__input' aria-label='Занятие' name='description' required type='text'  minLength='2' maxLength='30' placeholder='Занятие' />
        <p className='popup__error popup__error_description'></p>
        <button className='button popup__button popup__button_type_save' type='submit' disabled>Сохранить</button>
      </>
    ),
  },
  editPopup: {
    name: 'edit',
    title: 'Редактировать профиль',
    children: (
      <>
        <input className='popup__input' aria-label='Имя' name='editName' required type='text' minLength='2' maxLength='30' placeholder='Имя' />
        <p className='popup__error popup__error_editName'></p>
        <input className='popup__input' aria-label='Занятие' name='description' required type='text'  minLength='2' maxLength='30' placeholder='Занятие' />
        <p className='popup__error popup__error_description'></p>
        <button className='button popup__button popup__button_type_save' type='submit' disabled>Сохранить</button>
      </>
    ),
  },
  avatarPopup: {
    name: 'avatar',
    title: 'Обновить аватар',
    children: (
      <>
        <input className='popup__input' aria-label='Ссылка на аватар' name='avatar' required type='url' placeholder='Ссылка на аватар' />
        <p className='popup__error popup__error_avatar'></p>
        <button className='button popup__button popup__button_type_save' type='submit' disabled>Сохранить</button>
      </>
    ),
  },
};

export default popupData;
