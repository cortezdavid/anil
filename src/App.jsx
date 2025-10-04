import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Pokemon from './components/pokemon/Pokemon'
import Navbar from './components/navbar/Navbar'
import ScrollToTop from './components/scrollToTop/ScrollToTop'
import MT from './components/mt/MT'
import Trainers from './components/trainers/Trainers'

function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:id' element={<Pokemon />} />
          <Route path='/mt' element={<MT />} />
          <Route path='entrenadores' element={<Trainers />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
