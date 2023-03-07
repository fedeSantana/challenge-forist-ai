import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider as UrqlProvider } from 'urql'
import urqlClient from './config/clientRickAndMorty'
import ErrorPage from './error-page'
import Home from './routes/Home'
import Root from './routes/Root'

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
        ],
    },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <UrqlProvider value={urqlClient}>
                    <RouterProvider router={router} />
            </UrqlProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
