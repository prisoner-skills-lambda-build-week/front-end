import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../data'

export default class Prisons extends Component {
  componentDidMount() {
    axios
      .get(`${API}/prisons`)
      .then(({ data }) => this.setState({ prisons: data }))
  }

  render() {
    return <div>{JSON.stringify(this.state)}</div>
  }
}
