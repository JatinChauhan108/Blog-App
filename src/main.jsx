import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import provider from "./store/store";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'  
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Login from './pages/Login.jsx'
import Post from './pages/Post.jsx'
import { AuthLayout } from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element = {<App />}>

      <Route path = '/' element = {<Home />} />

      <Route path = '/login' element = {
        <AuthLayout authentication = {false}>
          <Login />
        </AuthLayout>
      } />

      <Route path = '/signup' element = {
        <AuthLayout authentication = {false}>
          <Signup />
        </AuthLayout>
        } />

      <Route path = '/post/:slug' element = {<Post />} />

      <Route path = '/add-post' element = {
        <AuthLayout>
          <AddPost />
        </AuthLayout>
        } />

      <Route path = '/edit-post/:slug' element = {
        <AuthLayout>
          <EditPost />
        </AuthLayout>
        } />

      <Route path = '/all-posts' element = {
        <AuthLayout>
          <AllPosts />
        </AuthLayout>
        } />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={provider}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
