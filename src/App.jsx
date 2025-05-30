import { Outlet } from 'react-router-dom'
import {Header, Footer} from "./components";
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData));
      }
      else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  }, [])


  return (
    (!loading) ? (
    <div className='min-h-screen flex flex-wrap bg-slate-50'>
      <div className='w-full block'>  
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    ) : null
  )
}

export default App
