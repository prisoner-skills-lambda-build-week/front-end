/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import Axios from 'axios'
import { API } from '../data'

const PrisonerCard = ({
  id,
  prison_id,
  name,
  canHaveWorkLeave,
  skills,
  skill,
  onChange,
  addSkill,
}) => (
  <div className='card'>
    <div className='card-content'>
      <p className='title'>{name}</p>
      <p className='subtitle'>
        {`Can Have Work Leave: ${String(canHaveWorkLeave)}`}
      </p>

      <ul>
        <h6 className='subtitle is-bold'>skills:</h6>
        {skills.map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
        <li>
          <form onSubmit={addSkill}>
            <div className='field has-addons'>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Add A Skill'
                  name='skill'
                  value={skill}
                  onChange={onChange}
                />
              </div>
              <div className='control'>
                <button type='submit' className='button is-success'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </li>
      </ul>
    </div>
  </div>
)

export default class Prisoner extends Component {
  state = {
    id: 0,
    prison_id: 0,
    name: ``,
    canHaveWorkLeave: true,
    editing: false,
    skills: [],
    skill: ``,
  }

  // eslint-disable-next-line react/no-access-state-in-setstate

  componentDidMount() {
    const { params } = this.props.match
    const { id } = params

    Axios.get(`${API}/prisoners/${id}`).then(
      ({ data: { id, name, canHaveWorkLeave, skills, prison_id } }) =>
        this.setState({ prison_id, name, canHaveWorkLeave, skills })
    )
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  changeUser = e => {
    e.preventDefault()
    console.log(this.state)
  }

  // addSkill = e => {

  //   e.preventDefault()
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  toggleEdit = () => this.setState({ editing: !this.state.editing })

  addSkill = e => {
    const { prisoner_id, skill } = this.state
    e.preventDefault()
    Axios.post(`${API}/skills`, {
      body: {
        prisoner_id: 1,
        name: `skill`,
      },
      token: localStorage.getItem(`token`),
    })
      .then(res => console.log(res.status))
      .catch(err => console.error(err))
    console.log(localStorage.getItem(`token`))
  }

  render() {
    const { id, name, canHaveWorkLeave, skill } = this.state

    const opts = [true, false]

    const PrisonerForm = () => (
      <form onSubmit={this.changeUser}>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              name='name'
              // value={name}
              placeholder='New Name...'
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Subject</label>
          <div className='control'>
            <div className='select'>
              <select
                name='canHaveWorkLeave'
                onChange={this.handleChange}
                value={canHaveWorkLeave}>
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
    )

    return (
      <div>
        {JSON.stringify(this.state)}
        <PrisonerCard
          {...this.state}
          onChange={this.handleChange}
          addSkill={this.addSkill}
        />

        <button
          type='button'
          className='button is-primary'
          onClick={this.toggleEdit}>
          edit prisoner skills
        </button>

        {this.state.editing ? <PrisonerForm /> : null}
      </div>
    )
  }
}
