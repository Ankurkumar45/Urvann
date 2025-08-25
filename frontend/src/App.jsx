import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Plants from './Pages/Plants'
import AddPlants from './Pages/AddPlants'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Plants />} />
        <Route path="/add-plant" element={<AddPlants />} />
      </Routes>
    </Router>
  )
}

export default App
