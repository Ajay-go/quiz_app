import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz_Page from './pages/home_page'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Landing />} />
        <Route path="/quiz/:testId" element={<Quiz_Page />} />
        <Route path='/signup' element= {<Signup />} />
        <Route path='/login' element= {<Login />} />
        <Route path='/profile' element = {<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
