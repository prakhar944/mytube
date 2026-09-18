import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import WatchVideo from "./pages/WatchVideo.jsx"
import MainLayout from './layouts/MainLayout.jsx'


function App() {

  return (
    <Routes>
      <Route element = {<MainLayout />}>
      <Route path='/' element = { <Home />} />
      <Route path='/watch/:videoId' element = { <WatchVideo />} />
      </Route>

      
      <Route path='/login' element = { <Login />} />
      <Route path='/register' element = { <Register />} />
    </Routes>
  )
}

export default App
