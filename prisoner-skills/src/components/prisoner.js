/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import Axios from 'axios'
import { API, AUTH } from '../data'
import { Link } from 'react-router-dom'

export default class Prisoner extends Component {
  state = {
    name: ``,
    newName: ``,
    newCanHaveWorkLeave: null,
    prisoner_id: 0,
    canHaveWorkLeave: true,
    editing: false,
    skills: [],
    skill: ``,
  }

  componentDidMount() {
    const { params } = this.props.match
    const { prisoner_id } = params

    Axios.get(`${API}/prisoners/${prisoner_id}`).then(
      ({ data: { name, canHaveWorkLeave, skills } }) =>
        this.setState({ prisoner_id, name, canHaveWorkLeave, skills })
    )
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleEdit = () => this.setState({ editing: !this.state.editing })

  addSkill = e => {
    e.preventDefault()
    const { prisoner_id, skill } = this.state
    const request = {
      name: skill,
      prisoner_id,
    }
    Axios.post(`${API}/skills`, request, AUTH)
      .then(res => console.log(res.status))
      .catch(err => console.error(err))
    this.props.history.push(
      `/prison/${this.props.match.params.prison_id}/prisoner/${
        this.props.match.params.prisoner_id
      }`
    )
  }

  editUser = e => {
    e.preventDefault()

    const newUserInfo = {
      prison_id: this.props.match.params.prison_id,
      name: this.state.newName === `` ? this.state.name : this.state.newName,
      canHaveWorkLeave:
        this.state.newCanHaveWorkLeave === null
          ? this.state.canHaveWorkLeave
          : this.state.newCanHaveWorkLeave,
    }

    console.log(newUserInfo)

    Axios.put(
      `${API}/prisoners/${this.props.match.params.prisoner_id}`,
      newUserInfo,
      AUTH
    )
    this.setState({
      name: newUserInfo.name,
      canHaveWorkLeave: newUserInfo.canHaveWorkLeave,
      editing: false,
    })

    this.props.history.push(
      `/prison/${this.props.match.params.prison_id}/prisoner/${
        this.props.match.params.prisoner_id
      }`
    )
  }

  deletePrisoner = e => {
    e.preventDefault()
    Axios.delete(`${API}/prisoners/${this.state.prisoner_id}`, AUTH)

    this.props.history.push(`/prison/${this.props.match.params.prison_id}`)
  }

  render() {
    const {
      id,
      name,
      newCanHaveWorkLeave,
      canHaveWorkLeave,
      skill,
      skills,
    } = this.state

    const opts = [true, false]

    return (
      <div>
        <section className='hero is-info'>
          <div className='hero-body '>
            <h1 className='title'>{name}</h1>
          </div>
        </section>
        <section className='section'>
          <div className='card' style={{ marginBottom: `1rem` }}>
            <div className='card-content'>
              <p className='title'>{name}</p>
              <p className='subtitle'>
                {`Can Have Work Leave: ${String(canHaveWorkLeave)}`}
              </p>

              {this.state.skills.length !== 0 ? (
                <ul>
                  <h6 className='subtitle is-bold'>skills:</h6>
                  {this.state.skills.map(skill => (
                    <li key={skill.id}>{skill.name}</li>
                  ))}
                </ul>
              ) : null}

              {localStorage.getItem(`prison_id`) ===
              this.props.match.params.prison_id ? (
                <form onSubmit={this.addSkill}>
                  <div className='field has-addons'>
                    <div className='control'>
                      <input
                        className='input'
                        type='text'
                        placeholder='Add A Skill'
                        name='skill'
                        value={skill}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className='control'>
                      <button type='submit' className='button is-success'>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
          </div>

          {localStorage.getItem(`prison_id`) ===
          this.props.match.params.prison_id ? (
            <>
              <button
                type='button'
                onClick={this.deletePrisoner}
                className='button is-danger'>
                Delete User
              </button>
              <button
                type='button'
                className='button is-primary'
                onClick={this.toggleEdit}>
                edit prisoner skills
              </button>

              {this.state.editing ? (
                <form onSubmit={this.editUser}>
                  <div className='field'>
                    <label className='label'>Name</label>
                    <input
                      className='input'
                      type='text'
                      name='newName'
                      onChange={this.handleChange}
                      placeholder='New Name...'
                    />
                  </div>

                  <div className='field'>
                    <label className='label'>Subject</label>
                    <div className='control'>
                      <div className='select'>
                        <select
                          name='newCanHaveWorkLeave'
                          onChange={this.handleChange}>
                          {opts.map((opt, i) => (
                            <option
                              key={`option-${i}`}
                              value={Boolean(opt)}
                              label={String(opt)}>
                              {JSON.stringify(opt)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='control'>
                    <button type='submit' className='button is-link'>
                      Submit
                    </button>
                  </div>
                </form>
              ) : null}
            </>
          ) : null}
        </section>
      </div>
    )
  }
}
