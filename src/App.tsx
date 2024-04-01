import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Authentication from './routes/authentication/Authentication'
import Home from './routes/home/Home'

function App() {
  return (
    <Routes>
      <Route path='auth' element={<Authentication />} />
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App
