import { generatePath } from 'react-router-dom'
import { test } from 'vitest'
import { createVinessApp } from '../app'

test('app router', () => {
    const app = createVinessApp({ i18nConfig: { debug: true } })

    const LandingRoute = app.addRoute({ path: '/:test' })

    const AppRoute = app.addRoute({ path: '/app' })
    const AppSubRoute = app.addChildRoute(AppRoute, { path: 'sub' })

    const landingRoute = app.getRoute(LandingRoute)

    console.log(landingRoute.getFullPath())
    console.log(landingRoute.generatePath({ params: { test: '10' } }))
})
