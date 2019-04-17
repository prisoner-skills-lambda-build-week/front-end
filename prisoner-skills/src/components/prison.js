import React, { Component } from 'react'
import { API } from '../data'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Card = ({ id, name, canHaveWorkLeave }) => (
  <div className='card' style={{ marginBottom: `1rem` }}>
    <header className='card-header'>
      <p className='card-header-title'>{name}</p>
      <Link
        to={`/prisoner/${id}`}
        className='card-header-icon'
        aria-label='more options'>
        <span className='icon'>
          <i className='fas fa-angle-right' aria-hidden='true' />
        </span>
      </Link>
    </header>
    <div className='card-content'>
      <p className='subtitle'>
        Able to have work leave: {JSON.stringify(canHaveWorkLeave)}
      </p>
      <span className='icon'>
        <i className='fas fa-angle-right' aria-hidden='true' />
      </span>
    </div>
    <footer className='card-footer'>
      <p className='card-footer-item'>
        <span>
          <Link to={`/prisons/${name}`}>View Prisoners</Link>
        </span>
      </p>
      <p className='card-footer-item'>
        <span>
          Share on <a href='#'>Facebook</a>
        </span>
      </p>
    </footer>
  </div>
)

export default class Prison extends Component {
  state = {
    prisoners: [],
  }

  componentDidMount() {
    const { match } = this.props

    axios
      .get(`${API}${match.url}/`)
      .then(({ data }) => this.setState({ prisoners: data.prisoners }))
  }

  render() {
    const { prisoners } = this.state

    return (
      <div>
        {prisoners.map((prisoner, i) => (
          <Card key={prisoner.id} {...prisoner} />
        ))}
      </div>
    )
  }
}
