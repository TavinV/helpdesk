import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import { AuthProvider } from './context/authContext.jsx';
import PrivateRoute from './components/auth/PrivateRoute.jsx';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import OpenTicket from './pages/OpenTicket.jsx';
import MyTickets from './pages/MyTickets.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/about',
    element: <AboutUs />
  },
  {
    path: '/profile',
    element: (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  )
  },
  {
    path: '/verify-email',
    element: (
    <PrivateRoute>
      <VerifyEmail />
    </PrivateRoute>
  )
  },
  {
    path: '/open-ticket',
    element: (
    <PrivateRoute>
      <OpenTicket />
    </PrivateRoute>
  )
  },
  {
    path: '/my-tickets',
    element: (
    <PrivateRoute>
      <MyTickets />
    </PrivateRoute>
  )
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
