import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"
import Cont from './components/Cont'
import Navbar from './components/Navbar'

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar/>}/>
      <Route path='/card/:id/:login/:avatar_url' element={<Cont/>} />
    </Routes>
  
   </BrowserRouter>
  )
}

export default App