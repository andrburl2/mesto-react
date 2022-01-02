import { React, PureComponent } from 'react';

import { api } from '../../utils/api';

class Registration extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      about: '',
      avatar: '',
      email: '',
      password: '',
    }
  }

  registration = (e) => {
    e.preventDefault();

    api.registration(this.state.name, this.state.about, this.state.avatar, this.state.email, this.state.password)
      .then(data => console.log(data));

    this.setState({
      name: '',
      about: '',
      avatar: '',
      email: '',
      password: '',
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() { 
    return (
      <div className='join__block join__block_position_back' name='signup'>
        <form className='join__form' onSubmit={this.registration}>
          <input
            className='input join__input'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            placeholder='Имя'
            type='text'
          ></input>

          <input
            className='input join__input'
            name='about'
            value={this.state.about}
            onChange={this.handleChange}
            placeholder='Занятие'
            type='text'
          ></input>

          <input
            className='input join__input'
            name='avatar'
            value={this.state.avatar}
            onChange={this.handleChange}
            placeholder='Ссылка на аватар'
            type='text'
          ></input>

          <input
            className='input join__input'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            placeholder='Email'
            type='email'
          ></input>

          <input
            className='input join__input'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Пароль'
            type='password'
          ></input>

          <button className='button join__button' type='submit'>Зарегистрироваться</button>
        </form>
      </div>
    );
  }
}
 
export default Registration;