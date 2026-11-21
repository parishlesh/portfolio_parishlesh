import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import PageNotFound from './pages/PageNotFound'
import AdminPortal from './pages/AdminPortal'

function App() {
  const [progress, setProgress] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <LoadingBar color='#2B4DFF' progress={progress} height={3} shadow loaderSpeed={500} transitionTime={500} />
      <Routes>
        <Route path='/' element={<Home setProgress={setProgress} />} />
        <Route path='/about' element={<Home setProgress={setProgress} section='about' />} />
        <Route path='/contact' element={<Home setProgress={setProgress} section='contact' />} />
        <Route path='/services' element={<Home setProgress={setProgress} section='work' />} />
        <Route path='/admin/*' element={<AdminPortal />} />
        <Route path='/*' element={<PageNotFound setProgress={setProgress} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
