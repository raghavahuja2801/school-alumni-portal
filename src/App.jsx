// App.tsx
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Admin from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import Connects from './components/Connects';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/connect',
    element: <Connects />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
