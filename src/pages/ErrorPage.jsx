import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError()

    return (
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-bold mt-20 text-red-500">Error</h1>
            <p>{error.message || error.statusText}</p>
        </div>
    )
}