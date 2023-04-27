import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"


//Layaout
import Layout from './components/Layout'

//Pages
import NewClient, {action as newClientAction} from './pages/NewClient'
import Index, {loader as clientsLoader} from './pages'
import ErrorPage from './pages/ErrorPage'
import EditClient, {loader as editClient, action as editClientAction} from './pages/EditClient'

//Components
import {action as deleteClientAction} from "./components/Client"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: clientsLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: "/clients/new",
        element: <NewClient />,
        action: newClientAction,
        errorElement: <ErrorPage/>
      },
      {
        path: "/clients/:clientID/edit",
        element: <EditClient />,
        loader: editClient,
        action: editClientAction,
        errorElement: <ErrorPage/>
      },
      {
        path: "/clients/:clientID/delete",
        action: deleteClientAction
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
