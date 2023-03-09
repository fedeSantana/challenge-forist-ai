import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    if (isRouteErrorResponse(error)) {
        return (
            <div id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.data.message}</i>
                </p>
            </div>
        )
    }

    return <div> Oh no ): its broken!</div>
}
