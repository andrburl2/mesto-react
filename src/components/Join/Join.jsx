import { React, PureComponent } from 'react';

import './join.css';

import Login from './Login';
import Registration from './Registration';

class Join extends PureComponent {
  render() {
    return (
      <div className='section join'>
        <h3 className='join__title'>Для продолжения войдите или зарегистрируйтесь</h3>

        <input className='join__checkbox' type='checkbox' id='join__checkbox'/>
        
        <label className='join__label' htmlFor='join__checkbox'>
          <p className='join__text-label'>Вход</p>
          <p className='join__text-label'>Регистрация</p>          
        </label>

        <div className='join__3d-wrapper'>
          <Login/>

          <Registration />
        </div>
      </div>
    )
  }
}

export default Join;