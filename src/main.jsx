import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Login, Profile, Signup } from './components/index.js'
import { Provider } from 'react-redux'
import store from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='profile' element={<Profile/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>,
)
