/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import { API, AUTH, OWNER } from '../data'
import { Link } from 'react-router-dom'
import Axios from 'axios'

const Card = ({ id, name, prison_id }) => (
  <div className='card' style={{ marginBottom: `1rem` }}>
    <header className='card-header'>
      <p className='card-header-title'>{name}</p>
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          margin: `0 0.5rem 0 0`,
        }}>
        <Link
          to={`/prison/${prison_id}/prisoner/${id}`}
          className='card-header-icon'
          aria-label='more options'>
          View Prisoner
          <span className='icon'>
            <i className='fas fa-angle-right' aria-hidden='true' />
          </span>
        </Link>
      </div>
    </header>
  </div>
)

export default class Prison extends Component {
  state = {
    prisoners: [],
    adding: false,
    name: ``,
    prisonerName: ``,
    prison_id: Number(this.props.match.params.prison_id),
  }

  componentDidMount() {
    const { prison_id } = this.state
    Axios.get(`${API}/prisons/${prison_id}/`).then(({ data }) =>
      this.setState({
        prisoners: data.prisoners,
        name: data.name,
        address: data.address,
      })
    )

    console.log(this.state)
  }

  addPrisoner = e => {
    e.preventDefault()
    const { prison_id } = this.state

    const body = {
      name: this.state.prisonerName,
      prison_id: this.state.prison_id,
    }

    Axios.post(`${API}/prisoners/`, body, AUTH)
    Axios.get(`${API}/prisons/${prison_id}/`).then(({ data }) =>
      this.setState({
        prisoners: data.prisoners,
        name: data.name,
        adding: false,
      })
    )
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {
      prisoners,
      name,
      prisonerName,
      editing,
      prison_id,
      address,
    } = this.state
    const { handleChange, addPrisoner } = this
    const NewPrisonerForm = () => <div>hello</div>

    return (
      <div>
        <section className='hero is-primary'>
          <div className='hero-body'>
            <h1 className='title'>{name}</h1>
            <p className='subtitle'>{address}</p>
          </div>
        </section>

        <section className='section container'>
          {prisoners.map((prisoner, i) => (
            <Card
              key={prisoner.id}
              {...prisoner}
              prison_id={this.state.prison_id}
            />
          ))}

          {localStorage.getItem(`prison_id`) ===
          this.props.match.params.prison_id ? (
            !editing ? (
              <button
                type='button'
                className='button is-link'
                onClick={() => this.setState({ editing: !editing })}>
                Add Prisoner
              </button>
            ) : (
              <form onSubmit={addPrisoner}>
                <div className='field has-addons'>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      placeholder='Prisoner Name'
                      name='prisonerName'
                      value={prisonerName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='control is-grouped'>
                    <button type='submit' className='button is-success'>
                      Submit
                    </button>
                  </div>
                </div>
                <button
                  className='button'
                  type='button'
                  onClick={() => this.setState({ editing: !editing })}>
                  cancel
                </button>
              </form>
            )
          ) : null}
        </section>
      </div>
    )
  }
}
