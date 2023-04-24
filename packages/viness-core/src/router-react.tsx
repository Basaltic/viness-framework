import { RouterProvider } from 'react-router-dom'
import { useAppContext } from './app-react-context'
import { IVinessRouter, VinessRouter } from './router'

/**
 * A React Component to create Routes
 */
export const AppRouter = () => {
    const app = useAppContext()

    const vinessRouter = app?.getService(IVinessRouter) as VinessRouter
    if (!vinessRouter) throw new Error('AppRouter is not wrapped b VinessApp')

    let router = vinessRouter?._getInnerRouter()
    if (!router) throw new Error('Router is not initialized')

    return <RouterProvider router={router} />
}
