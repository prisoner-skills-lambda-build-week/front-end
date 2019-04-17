/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GUEST } from '../data'

const navLinks = [
  { name: `Home`, path: `/` },
  { name: `Prisoners`, path: `/prisoners` },
  { name: `Prisons`, path: `/Prisons` },
]

const clearStorage = () => {
  localStorage.clear()
}

export default class Navigation extends Component {
  state = {
    isNavOpen: false,
  }

  toggleNav = () => {
    this.setState({ isNavOpen: !this.state.isNavOpen })
  }

  render() {
    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            Home
          </Link>

          <span
            onClick={this.toggleNav}
            role='button'
            className='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'>
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </span>
        </div>

        <div
          id='navbarBasicExample'
          className={`navbar-menu ${
            this.state.isNavOpen ? `is-active` : null
            }`}>
          <div className='navbar-start'>
            {GUEST ? <Link className='navbar-item' to='/prisons'>Prisons</Link> : <Link
              to={`/prison/${localStorage.getItem(`prison_id`)}`}
              className='navbar-item'>
              Profile
            </Link>}
          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                {GUEST ? (
                  <>
                    <Link
                      to='/signup'
                      className='button is-primary'
                      onClick={this.toggleNav}>
                      <strong>Sign up</strong>
                    </Link>
                    <Link
                      to='/login'
                      className='button is-light'
                      onClick={this.toggleNav}>
                      Log in
                    </Link>
                  </>
                ) : (
                    <Link
                      to='/'
                      className='button is-danger'
                      onClick={() => localStorage.clear()}>
                      Sign Out
                  </Link>
                  )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
