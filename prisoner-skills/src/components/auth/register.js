import { API } from '../../data'
import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ``,
      address: ``,
      name: ``,
      password: ``,
    }
  }

  addPrison = e => {
    e.preventDefault()

    const { username, address, name, password } = this.state

    axios.post(`${API}/auth/register`, {
      username,
      address,
      name,
      password,
    })
    this.setState({
      username: ``,
      address: ``,
      name: ``,
      password: ``,
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, address, name, password } = this.state
    return (
      <form onSubmit={this.addPrison}>
        <input
          name='username'
          type='text'
          placeholder='username'
          value={username}
          onChange={this.handleChange}
        />
        <input
          name='address'
          type='text'
          placeholder='address'
          value={address}
          onChange={this.handleChange}
        />
        <input
          name='name'
          type='text'
          placeholder='name'
          value={name}
          onChange={this.handleChange}
        />
        <input
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={this.handleChange}
        />
        <button type='submit'>Register New Prison</button>
      </form>
    )
  }
}
