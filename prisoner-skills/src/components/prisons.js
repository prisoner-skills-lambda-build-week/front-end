import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../data'
import { Link } from 'react-router-dom'

const Card = ({ id, name, username, address }) => (
  <div className='card' style={{ margin: `1rem 0` }}>
    <div className='card-content'>
      <p className='title'>{name}</p>
      <p className='subtitle'>{address}</p>
      <p className='subtitle'>{username}</p>
    </div>
    <footer className='card-footer'>
      <p className='card-footer-item'>
        <span>
          <Link to={`/prison/${id}`}>View Prisoners</Link>
        </span>
      </p>
    </footer>
  </div>
)

export default class Prisons extends Component {
  state = {
    prison_id: this.props.match.params.prison_id,
    prisons: [],
  }

  componentDidMount() {
    axios.get(`${API}/prisons`).then(({ data }) => {
      this.setState({ prisons: data })
    })
  }

  render() {
    const { prisons } = this.state
    return (
      <div>
        {prisons.map(pris => (
          <Card key={pris.id} {...pris} />
        ))}
      </div>
    )
  }
}
