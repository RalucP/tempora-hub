import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Authentication from './routes/authentication/Authentication'
import Home from './routes/home/Home'
import PrivatePage from './components/private-page/PrivatePage'

function App() {
  return (
    <Routes>
      <Route path='auth' element={<Authentication />} />
      <Route path='/' element={<PrivatePage>
        <Home />
      </PrivatePage>} />
    </Routes>
  )
}

export default App
