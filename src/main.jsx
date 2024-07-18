import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './components/LoginPage';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './components/HomePage';
import Admin from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import Test from './components/Test';
import '@fortawesome/fontawesome-free/css/all.min.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />
  },
  {
    path: "/test",
    element: <Test />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
