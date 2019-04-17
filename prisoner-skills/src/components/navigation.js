import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
`

const navLinks = [
  { name: `Home`, path: `/` },
  { name: `Prisoners`, path: `/prisoners` },
  { name: `Prisons`, path: `/Prisons` },
]

const Navigation = ({ links }) => (
  <nav className='navbar' role='navigation' aria-label='main navigation'>
    <div className='navbar-brand'>
      <a className='navbar-item' href='https://bulma.io'>
        <img
          src='https://bulma.io/images/bulma-logo.png'
          width='112'
          height='28'
          alt='logo'
        />
      </a>

      <a
        role='button'
        className='navbar-burger burger'
        aria-label='menu'
        aria-expanded='false'
        data-target='navbarBasicExample'>
        <span aria-hidden='true' />
        <span aria-hidden='true' />
        <span aria-hidden='true' />
      </a>
    </div>

    <div id='navbarBasicExample' className='navbar-menu'>
      <div className='navbar-start'>
        <Link to='/' className='navbar-item'>
          Home
        </Link>
        <Link to='/prisons' className='navbar-item'>
          Prisons
        </Link>

        <a className='navbar-item'>Documentation</a>

        <div className='navbar-item has-dropdown is-hoverable'>
          <a className='navbar-link'>More</a>

          <div className='navbar-dropdown'>
            <a className='navbar-item'>About</a>
            <a className='navbar-item'>Jobs</a>
            <a className='navbar-item'>Contact</a>
            <hr className='navbar-divider' />
            <a className='navbar-item'>Report an issue</a>
          </div>
        </div>
      </div>

      <div className='navbar-end'>
        <div className='navbar-item'>
          <div className='buttons'>
            <Link className='button is-primary' to='/signup'>
              <strong>Sign up</strong>
            </Link>
            <Link to='/login' className='button is-light'>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
)

export default Navigation
