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
      .then(({ data: { token, prison: { id } } }) => {
        localStorage.setItem(`token`, token)
        localStorage.setItem(`username`, username)
        localStorage.setItem(`prison_id`, id)
        this.props.history.push(`/prison/${id}`)
      })
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
      <section className='section container'>
        <form onSubmit={this.handleLogin}>
          <div className='field'>
            <p className='control has-icons-left has-icons-right'>
              <input
                className='input'
                name='username'
                type='text'
                placeholder='username'
                value={username}
                onChange={this.handleChange}
              />

              <span className='icon is-small is-left'>
                <i className='fas fa-envelope' />
              </span>
              <span className='icon is-small is-right'>
                <i className='fas fa-check' />
              </span>
            </p>
          </div>
          <div className='field'>
            <p className='control has-icons-left'>
              <input
                className='input'
                name='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={this.handleChange}
              />

              <span className='icon is-small is-left'>
                <i className='fas fa-lock' />
              </span>
            </p>
          </div>

          <div className='field '>
            <div className='control'>
              <button type='submit' className='button is-link'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  }
}
