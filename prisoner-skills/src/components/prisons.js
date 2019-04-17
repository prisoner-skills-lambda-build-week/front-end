import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../data'
import { Link } from 'react-router-dom'

const Card = ({ id, name, address }) => (
  <div className='card'>
    <div className='card-content'>
      <p className='title'>{name}</p>
      <p className='subtitle'>{address}</p>
    </div>
    <footer className='card-footer'>
      <p className='card-footer-item'>
        <span>
          <Link to={`/prisons/${id}`}>View Prisoners</Link>
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

export default class Prisons extends Component {
  state = {
    prisons: [],
  }

  componentDidMount() {
    axios
      .get(`${API}/prisons`)
      .then(({ data }) => this.setState({ prisons: data }))
  }

  render() {
    const { prisons } = this.state
    return (
      <div>
        {JSON.stringify(prisons)}
        {prisons.map(pris => (
          <Card key={pris.id} {...pris} />
        ))}
      </div>
    )
  }
}
