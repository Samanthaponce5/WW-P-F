import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Exercise({ exercise, deleteExercise }) {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={'/edit/' + exercise._id}>edit</Link> |{' '}
        <a
          href="#"
          onClick={() => {
            deleteExercise(exercise._id)
          }}
        >
          delete
        </a>
      </td>
    </tr>
  )
}

function ExercisesList() {

    const [exercises, setExercises] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/exercises/')
        .then((resp)=>{
            setExercises(resp.data)
        })
        .catch((err)=>console.log('Error: ' + err))
    },[])

    const deleteExercise = (id) => {
        axios.delete(`http://localhost:3001/exercises/${id}`)
        .then((resp)=>console.log(resp))

        setExercises((prevState) => prevState.filter((el) => el._id !== id))
    }

    const exerciseList = () =>{
        return exercises.map((currentExercises, index) => {
            return <Exercise key={index} exercise={currentExercises} deleteExercise={deleteExercise}/>
        })
    }
  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  )
}

export default ExercisesList
