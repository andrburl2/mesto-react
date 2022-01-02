import { React, PureComponent } from 'react';

import { api } from '../../utils/api';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  login = (e) => {
    e.preventDefault();

    api.login(this.state.email, this.state.password)
      .then(data => console.log(data));

    this.setState({
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
      <div className='join__block join__block_position_front' name='signin'>
        <form className='join__form' onSubmit={this.login}>
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

          <button className='button join__button' type='submit'>Войти</button>
        </form>
      </div>
    );
  }
}
 
export default Login;