import { React, PureComponent } from 'react';

import validate from '../../utils/validation';
import { api } from '../../utils/api';

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

    api.login(this.state.email, this.state.password)
      .then(data => {
        if (data.status !== 200) {
          this.setState({ message: data.message });
          return
        }

        this.props.updateProfile();
      });
  }

  handleChange = (e) => {
    const validity = validate(e.target);
    const errors = this.state.errors;
    errors[e.target.name] = validity.error;

    this.setState({
      [e.target.name]: e.target.value,
      errors: errors,
      isFormValid: validity.isFormValid,
      message: '',
    })
  }
  
  render() {
    return (
      <div className='join__block join__block_position_front' name='signin'>
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
    );
  }
}
 
export default Login;