import { RouterProvider } from 'react-router-dom'
import { VinessRouter } from './router'
import { useRouter } from './hooks'

export interface AppRouterProps {
    type: 'hash' | 'browser' | 'memory'
    basename?: string
}

/**
 * Router Component
 */
export const VinessAppRouter = () => {
    const vinessRouter = useRouter() as VinessRouter

    return <RouterProvider router={vinessRouter.reactRouter} />
}
