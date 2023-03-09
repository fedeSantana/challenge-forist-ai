import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Home from './routes/Root/childrens/Home/Home'
import Root from './routes/Root/Root'
import './styles/default.css'
import Game from './routes/Root/childrens/Game'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/game',
                element: <Game/>
            }
        ],
    },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
)
