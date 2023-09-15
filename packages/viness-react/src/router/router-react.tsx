import { RouterProvider } from 'react-router-dom'
import { useResolve } from '../hooks'
import { IVinessRouter } from './router.protocol'
import { VinessRouter } from './router'

export interface AppRouterProps {
    type: 'hash' | 'browser' | 'memory'
    basename?: string
}

/**
 * Router Component
 */
export const AppRouter = () => {
    const vinessRouter = useResolve(IVinessRouter) as VinessRouter

    return <RouterProvider router={vinessRouter.reactRouter} />
}
