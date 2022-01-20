import React, { PureComponent } from 'react';

import { api } from '../../utils/api';
import validate from '../../utils/validation';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
      isFormValid: false,
      message: '',
    }
  }

  login = (e) => {
    e.preventDefault();

    this.props.toggleLoader();
    api.login(this.state.email, this.state.password)
      .then(data => {
        if (data.status !== 200) {
          this.setState({ message: data.message, isFormValid: false, });
          return
        }

        // если пришел ответ со статусом 200, то получим с сервера данные пользователя, что вызовет переход на главную страницу
        this.props.getUserProfile();
      })
      .finally(() => this.props.toggleLoader());
  }

  handleChange = (e) => {
    // создается копия ошибок из стейта, затем в зависимости от имени input
    // свойство this.state.errors с тем же именем получает текст ошибки
    const validity = validate(e.target);
    const errors = this.state.errors;
    errors[e.target.name] = validity.error;

    // при вводе символа записывается значение поля, обновляются ошибки,
    // валидность всей формы для включения кнопки и очищается сообщение с сервера
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
        <div className={`join__block join__block_position_front ${isLoading ? 'hidden' : ''}`} name='login'>
          <form className='join__form' onSubmit={this.login}>
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
              Войти
            </button>
          </form>
        </div>

        {/* место лоадера */}
        {children}
      </>
    );
  }
}
 
export default Login;