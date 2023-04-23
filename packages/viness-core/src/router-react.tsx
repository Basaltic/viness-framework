import { RouterProvider } from 'react-router-dom'
import { useAppContext } from './app-react-context'
import { IVinessRouter } from './router'

/**
 * A React Component to create Routes
 */
export const AppRouter = () => {
    const app = useAppContext()

    const vinessRouter = app?.container.get(IVinessRouter)
    if (!vinessRouter) throw new Error('AppRouter is not wrapped b VinessApp')

    if (vinessRouter.getRoutes().length <= 0) throw new Error('No Route is defined')

    let router = vinessRouter?._getRouter()
    if (!router) throw new Error('AppRouter is not wrapped b VinessApp')

    return <RouterProvider router={router} />
}
