import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import CoverLetter from './pages/CoverLetter'
import CustomNavigationBar from './sharedComponents/CustomNavigationBar/CustomNavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <CustomNavigationBar />
      <Router>
        <Routes>
          <Route path='/Cover-Letter' element={<CoverLetter />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;

