import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/UI';
import { Home, Login, Write, Profile, Single, Update } from './pages';


function App() {
  return (
    <div>
      <Navbar />
      <div className='w-[90%] lg:w-[80%] xl:w-[70%] mx-auto py-10'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/write' element={<Write />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/posts/:id' element={<Single />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
