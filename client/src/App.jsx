import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Logout from './pages/Logout'
import AdminLayouts from './components/layouts/Admin-layouts'
import AdminUsers from './pages/Admin-Users'
import AdminContacts from './pages/Admin-Contacts'
import AdminUserUpdate from './pages/Admin-UserUpdate'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import EmailSentRedirect from './pages/EmailSentRedirect'
import TermsAndCondition from './pages/TermsAndCondition';

function App() {

  const [progress,setProgress] = useState(0);

  return (
  <>
    <BrowserRouter>
      <Navbar/>
      <LoadingBar
          color='#2B4DFF'
          progress={progress}
          height={3}
          shadow={true}
          loaderSpeed={500}
          transitionTime={500}
        />
      <Routes>
        <Route path='/' element={<Home setProgress={setProgress}/>} />
        <Route path='/about' element={<Home setProgress={setProgress} section='about'/>} />
        <Route path='/contact' element={<Home setProgress={setProgress} section='contact'/>} />
        <Route path='/services' element={<Home setProgress={setProgress} section='work'/>} />
        <Route path='/register' element={<Register setProgress={setProgress}/>} />
        <Route path='/terms-condition' element={<TermsAndCondition setProgress={setProgress}/>} />
        <Route path='/login' element={<Login setProgress={setProgress}/>} />
        <Route path='/forgot-password' element={<ForgotPassword setProgress={setProgress}/>} />
        <Route path='/emailSentRedirect' element={<EmailSentRedirect setProgress={setProgress}/>} />
        <Route path='/new-password' element={<NewPassword setProgress={setProgress}/>} />
        <Route path='/logout' element={<Logout setProgress={setProgress}/>} />
        <Route path='/*' element={<PageNotFound setProgress={setProgress}/>} />
        <Route path='/admin' element={<AdminLayouts setProgress={setProgress}/>}>
            <Route path='users' element={<AdminUsers setProgress={setProgress}/>}/>
            <Route path='contacts' element={<AdminContacts setProgress={setProgress}/>}/>
            <Route path='users/:id/edit' element={<AdminUserUpdate setProgress={setProgress}/>}/>

        </Route>

      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
