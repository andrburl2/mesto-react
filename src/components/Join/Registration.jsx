import { React, PureComponent } from 'react';

import { api } from '../../utils/api';
import validate from '../../utils/validation';

class Registration extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      about: '',
      avatar: '',
      email: '',
      password: '',
      errors: {
        name: '',
        about: '',
        avatar: '',
        email: '',
        password: ''
      },
      isFormValid: false,
      message: '',
    }
  }

  registration = (e) => {
    e.preventDefault();
    this.props.toggleLoader();

    api.registration(this.state.name, this.state.about, this.state.avatar, this.state.email, this.state.password)
      .then(data => {
        if (data.status !== 201) {
          this.setState({ message: data.message, isFormValid: false, });
          return
        }

        this.setState({
          name: '',
          about: '',
          avatar: '',
          email: '',
          password: '',
          isFormValid: false,
        })

        // переключаем checkbox на вход
        document.getElementById('join__checkbox').checked = false;
      })
      .finally(() => {
        this.props.toggleLoader();
      });
  }

  handleChange = (e) => {
    const validity = validate(e.target);
    /* создается копия ошибок из стейта, затем в зависимости от имени input
    свойство this.state.errors с тем же именем получает текст ошибки */
    const errors = this.state.errors;
    errors[e.target.name] = validity.error;

    /* при вводе символа записывается значение поля, обновляются ошибки,
    валидность всей формы для включения кнопки и очищается сообщение с сервера */
    this.setState({
      [e.target.name]: e.target.value,
      errors: errors,
      isFormValid: validity.isFormValid,
      message: '',
    })
  }

  render() {
    const { children, isLoading } = this.props;

    return (
      <>
        <div className={`join__block join__block_position_back ${isLoading ? 'hidden' : ''}`} name='registration'>
          <form className='join__form' onSubmit={this.registration}>
            <input
              className='input join__input'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
              type='text'
              minLength='2'
              maxLength='30'
              placeholder='Имя'
            ></input>
            <p className='join__error'>{this.state.errors.name}</p>

            <input
              className='input join__input'
              name='about'
              value={this.state.about}
              onChange={this.handleChange}
              required
              type='text'
              minLength='2'
              maxLength='30'
              placeholder='Занятие'
            ></input>
            <p className='join__error'>{this.state.errors.about}</p>

            <input
              className='input join__input'
              name='avatar'
              value={this.state.avatar}
              onChange={this.handleChange}
              required
              type='url'
              placeholder='Ссылка на аватар'
            ></input>
            <p className='join__error'>{this.state.errors.avatar}</p>

            <input
              className='input join__input'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              required
              type='email'
              placeholder='Email'
            ></input>
            <p className='join__error'>{this.state.errors.email}</p>

            <input
              className='input join__input'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              required
              type='password'
              minLength='8'
              placeholder='Пароль'
            ></input>
            <p className='join__error'>{this.state.errors.password}</p>

            { /* параграф для ответа с сервера */ }
            <p className='join__message'>{this.state.message}</p>

            <button
              className={`button join__button ${this.state.isFormValid ? 'join__button_active' : ''}`}
              type='submit'
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>

        {/* место лоадера */}
        {children}
      </>
    );
  }
}
 
export default Registration;