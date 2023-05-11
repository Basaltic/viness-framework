import { RouteObject, RouterProvider } from 'react-router-dom'
import { VinessRoute } from '../route'
import { useAppContext } from './app-react-context'

/**
 * A React Component to create Routes
 */
export const AppRouter = () => {
    const app = useAppContext()

    const vinessRouter = app?.router as any
    if (!vinessRouter) throw new Error('AppRouter is not wrapped b VinessApp')

    let router = vinessRouter?._getInnerRouter()
    if (!router) throw new Error('Router is not initialized')

    return <RouterProvider router={router} />
}
