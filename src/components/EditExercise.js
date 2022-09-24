import React, { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function EditExercise(props) {
    console.log(props)
  const [username, setUserName] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [date, setDate] = useState(new Date())
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/exercises/${id}`)
      .then((resp) => {
        setUserName(resp.data.username)
        setDescription(resp.data.description)
        setDuration(resp.data.duration)
        setDate(new Date(resp.data.date))
      })
      .catch((err) => console.log('Error: ', err))

    axios
      .get(`http://localhost:3001/users/`)
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.username))
        }
      })
      .catch((err) => console.log('Error: ', err))
  },[])

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
    e.preventDefault()

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    }

    console.log(exercise)

    axios
      .post(
        `http://localhost:3001/exercises/update/${id}`,
        exercise,
      )
      .then((res) => console.log(res.data))

    navigate('/')
  }
  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  )
}

export default EditExercise
