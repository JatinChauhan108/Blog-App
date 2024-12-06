import React from 'react'
import {Container, Logo, LogoutBtn} from '../index' 
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header() {

  const authStatus = useSelector((state) => (state.status));
  
  const navigate = useNavigate();
  
  const navItems = [
    {
      name : "Home",
      slug : "/",
      isActive : true
    },
    {
      name : "Login",
      slug : "/login",
      isActive : !authStatus
    },
    {
      name: "Signup",
      slug : "/signup",
      isActive : !authStatus
    },
    {
      name: "All Posts",
      slug : "/all-posts",
      isActive: authStatus
    },
    {
      name: "Add Post",
      slug : "/add-post",
      isActive: authStatus
    }
  ]
  

  return (
    
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to = "/">
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => (
              item.isActive ? (
                <li key = {item.name} className='flex align-middle'>
                  <button 
                  onClick={() => (navigate(item.slug))} 
                  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-lg'>
                    {item.name}
                  </button>
                </li>
              ) : null
            ))}
            {authStatus && (<li className='flex align-middle'><LogoutBtn/></li>)}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header