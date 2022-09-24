import React from 'react'
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import EditExercise from './components/EditExercise'
import ExercisesList from './components/ExercisesList'
import CreateExercise from './components/CreateExercise'
import CreateUser from './components/CreateUser'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
    <div className='container'>
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" element={<ExercisesList />} />
          <Route path="/edit/:id" element={<EditExercise/>} />
          <Route path="/create" element={<CreateExercise/>} />
          <Route path="/user" element={<CreateUser/>} />
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
