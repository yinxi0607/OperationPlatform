import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from '@/views/login/'
import Dashboard from '@/views/dashboard'
import NotFound from '@/views/404.tsx'
import NoPermission from '@/views/403.tsx'
import Layout from '@/layout'
import ShowList from "@/views/Content/ShowList";
import DeploymentsAll from "@/views/Content/ShowList/deployments.tsx";
import NamespacesDetail from "@/views/Content/Detail/namespaces.tsx";
import DeploymentCreate from "@/views/Content/Create/deployments.tsx";
import DeploymentsEdit from "@/views/Content/Edit/deployments.tsx";
import DeploymentDelete from "@/views/Content/Delete/deployments.tsx";

const router = [
    {
        path: "/",
        element: <Navigate to='/dashboard'/>
    },
    {
        element: <Layout/>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/namespaces",
                element: <Navigate to='/namespaces/list'/>
            },
            {
                path: "/namespaces/list",
                element: <ShowList headerName="Namespaces List"/>
            },
            {
                path: "/namespaces/create",
                element: <div>namespaces create</div>
            },
            {
                path: "/namespaces/edit/:item",
                element: <NamespacesDetail />
            },
            {
                path: "/namespaces/delete",
                element: <div>namespaces delete</div>
            },

            {
                path: "/deployments",
                element: <Navigate to='/deployments/list'/>
            },
            {
                path: "/deployments/list",
                element: <DeploymentsAll/>
            },
            {
                path: "/deployments/create",
                element: <DeploymentCreate/>
            },
            {
                path: "/deployments/:namespaceName/:deploymentName/edit",
                element: <DeploymentsEdit />
            },
            {
                path: "/deployments/:namespaceName/:deploymentName/delete",
                element: <DeploymentDelete />
            }


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
