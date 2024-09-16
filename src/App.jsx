import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (

    <Routes>

      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
    
    </Routes>
  )
}

export default App