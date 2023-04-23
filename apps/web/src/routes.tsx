import { VinessRoute, createRouterElement } from '@viness/core'
import LandingPage from './features/auth/pages/landing'

export const landingRoute = { path: '/', element: <LandingPage /> }

// Define the routes
const routes: VinessRoute[] = []

export const router = createRouterElement(routes)
