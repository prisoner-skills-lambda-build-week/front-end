import React, { Component } from 'react'
import { API } from '../data'
import axios from 'axios'

export default class Prisoners extends Component {
  state = {
    prisoners: [],
  }

  componentDidMount() {
    axios
      .get(`${API}/prisoners`)
      .then(({ data }) => this.setState({ prisoners: data }))
  }

  render() {
    const { prisoners } = this.state

    return (
      <div>
        <ul>
          {prisoners.map((prisoner, i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    )
  }
}
