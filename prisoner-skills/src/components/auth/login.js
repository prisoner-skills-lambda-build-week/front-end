import { API } from '../../data'
import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ``,
      password: ``,
    }
  }

  handleLogin = e => {
    e.preventDefault()

    const { username, password } = this.state

    axios
      .post(`${API}/auth/login`, {
        username,
        password,
      })
      .then(({ data: { token } }) => localStorage.setItem(`token`, token))
      .catch(err => console.error(err.response))

    this.setState({
      username: ``,
      password: ``,
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, password } = this.state
    return (
      <form onSubmit={this.handleLogin}>
        <input
          name='username'
          type='text'
          placeholder='username'
          value={username}
          onChange={this.handleChange}
        />
        <input
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={this.handleChange}
        />
        <button type='submit'>Login</button>
      </form>
    )
  }
}
