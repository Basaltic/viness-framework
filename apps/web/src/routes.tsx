import { VinessRoute, createRoute, createRouterElement } from '@viness/core'
import LandingPage from './features/auth/pages/landing'

const landing = createRoute({ path: '/', element: <LandingPage /> })

// Define the routes
const routes: VinessRoute[] = [landing]

export const router = createRouterElement(routes)
