import { test, expect } from 'vitest'
import { createVinessApp } from '../app'

test('app router', () => {
    const app = createVinessApp()

    const level1 = app.router.addRoute({ path: '/level1' })
    const level21 = app.router.addRoute({ path: 'level21' }, level1)
    const level22 = app.router.addRoute({ path: ':level22' }, level1)

    const level21Route = app.router.getRoute(level21)

    const fullPath1 = level21Route.getPath()
    expect(fullPath1).toBe('/level1/level21')

    const level22Route = app.services.getService(level22)
    const fullPath2 = level22Route.getPath()
    expect(fullPath2).toBe('/level1/:level22')

    const fullPathWithParams = level22Route.generatePath({ params: { level22: 'test' } })
    expect(fullPathWithParams).toBe('/level1/test')

    const fullPathWithParamsAndQuery = level22Route.generatePath({ params: { level22: 'test' }, queries: { name: 1 } })
    expect(fullPathWithParamsAndQuery).toBe('/level1/test?name=1')
})
