import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import WatchVideo from "./pages/WatchVideo.jsx"
// import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element = { <Home />} />
      <Route path='/login' element = { <Login />} />
      <Route path='/register' element = { <Register />} />
      <Route path='/watch/:videoId' element = { <WatchVideo />} />
    </Routes>
  )
}

export default App
