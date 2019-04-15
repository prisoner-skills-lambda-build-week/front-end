import React from 'react'
import styled from 'styled-components'

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
  <Navbar>
    <div>Prisoner Skills</div>
    <div>
      {navLinks.map(link => (
        <a key={link.name} href={link.path}>
          {link.name}
        </a>
      ))}
    </div>
  </Navbar>
)

export default Navigation
