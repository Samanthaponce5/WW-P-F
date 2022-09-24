import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
function CreateExercise({ props }) {
  const [username, setUserName] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [date, setDate] = useState(new Date())
  const [users, setUsers] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/users/')
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username))
          setUserName(response.data[0].username)
        }
      })
      .catch((err) => console.log('Error: ', err))
  }, [])

  const onChangeUsername = (e) => {
    setUserName(e.target.value)
  }
  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }
  const onChangeDuration = (e) => {
    setDuration(e.target.value)
  }
  const onChangeDate = (date) => {
    setDate(date)
  }

  const onSubmit = (e) => {
    console.log(e, 'E')
    e.preventDefault()
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    }

    axios
      .post('http://localhost:3001/exercises/add', exercise)
      .then((res) => console.log(res.data))
    console.log(exercise)
    navigate('/');
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              )
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <button className="btn btn-primary">Create Exercise Log</button>
        </div>
      </form>
    </div>
  )
}

export default CreateExercise
