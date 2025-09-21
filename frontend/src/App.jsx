import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz_Page from './pages/home_page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz_Page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
