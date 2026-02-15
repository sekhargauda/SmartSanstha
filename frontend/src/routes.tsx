import { RouteObject, Navigate } from 'react-router-dom'
import SiteLayout from '@/components/layout/SiteLayout'
// import DashboardLayout from '@/layouts/DashboardLayout'
// import {HomePage} from '@/pages/HomePage'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      // { index: true, element: <HomePage /> },
      // { path: 'learn', element: <Learn /> },
      // { path: 'games', element: <Games /> },
      // { path: 'blog', element: <Blog /> },
      // { path: 'about', element: <About /> },
      // { path: 'contact', element: <Contact /> },
      // { path: 'login', element: <Login /> },
      // { path: 'signup', element: <Signup /> },
      // { path: 'memory', element: <Memory /> },
      // { path: 'right', element: <Right /> },
    ]
  },
  // {
  //   path: '/dashboard',
  //   element: (
  //     // <ProtectedRoute>
  //       <DashboardLayout />
  //     // </ProtectedRoute> 
  //   ),
  //   children: [
  //     // { index: true, element: <Dashboard /> },
  //     { path: '*', element: <Navigate to="/dashboard" /> }
  //   ]
  // },
  // { path: '*', element: <NotFound /> }
]

export default routes

