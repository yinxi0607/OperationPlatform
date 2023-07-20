import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from '@/views/login/'
import Dashboard from 'src/views/dashboard'
import NotFound from '@/views/404.tsx'
import NoPermission from '@/views/403.tsx'
import Layout from '@/layout'

const router = [
  {
    path: "/",
    element: <Navigate to='/bashboard'/>
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/*",
    element: <Navigate to='/404'/>
  },
  {
    path: "/404",
    element: <NotFound/>
  },
  {
    path: "/403",
    element: <NoPermission/>
  }
]

// export default function Router(){
//   return useRoutes(router)
// }

export default createBrowserRouter(router)
