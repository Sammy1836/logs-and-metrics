import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Metrics from './pages/Metrics'
import Logs from './pages/Logs'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
