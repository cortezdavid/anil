import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Pokemon from './components/pokemon/Pokemon'
import Navbar from './components/navbar/Navbar'
import ScrollToTop from './components/scrollToTop/ScrollToTop'
import MT from './components/mt/MT'
import Trainers from './components/trainers/Trainers'
import PhotoP from './components/photoP/PhotoP'
import Items from './components/items/Items'
import BattleTower from './components/battleTower/BattleTower'
import Chat from './components/chat/Chat'
import Collection from './components/collection/Collection'
import ShareCollection from './components/collection/ShareCollection'
import Raids from './components/raids/Raids'

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
          <Route path='/objetos' element={<Items />} />
          <Route path='combates' element={<Trainers />} />
          <Route path='/fotos' element={<PhotoP />} />
          <Route path='/torrebatalla' element={<BattleTower />} />
          <Route path='/chat' element={<Chat />} />
          {/* <Route path='/coleccion' element={<Collection />} /> */}
          {/* <Route path='/coleccion/:id' element={<ShareCollection />} /> */}
          <Route path='/raids' element={<Raids />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
