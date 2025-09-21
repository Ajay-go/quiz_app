import React, { useState } from 'react'
import { Route, Routes } from 'react';
import Quiz_Page from './pages/home_page';

function App() {

  return (
    <>
      <Routes>


        <Route path="/" element={<Quiz_Page />} />
      </Routes>
    </>
  )
}

export default App
