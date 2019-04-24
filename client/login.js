import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from './store'

class Login extends Component { //= ({ user, login }) => {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const { email, password } = this.state
    this.props.login(email, password)
  }

  render() {
    return (
      <div className='h100 w100 flex column align-items-center justify-center'>
        <h1>Let's Loggin'!</h1>
        <div className='flex w50'>
          <img src='/loggin.png'/>
          <form className='grow1' onSubmit={this.handleSubmit}>
            <div className='flex column'>
              <div className='flex column m1'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' className='input' onChange={this.handleChange}/>
              </div>
              <div className='flex column m1'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' className='input' onChange={this.handleChange}/>
              </div>
              <div className='m1'>
                <button type='submit' className='btn bg-blue white p1 rounded'>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })


const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
