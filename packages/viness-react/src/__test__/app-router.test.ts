import { test, expect } from 'vitest'
import { createApp } from '../app/app'

test('app router', () => {
    const app = createApp()

    const level1 = app.routes.add({ path: '/level1' })
    const level21 = app.routes.add({ path: 'level21' }, level1)
    const level22 = app.routes.add({ path: ':level22' }, level1)

    const level21Route = app.routes.get(level21)

    const fullPath1 = level21Route.getFullPath()
    expect(fullPath1).toBe('/level1/level21')

    const level22Route = app.services.get(level22)
    const fullPath2 = level22Route.getFullPath()
    expect(fullPath2).toBe('/level1/:level22')

    const fullPathWithParams = level22Route.generatePath({ params: { level22: 'test' } })
    expect(fullPathWithParams).toBe('/level1/test')

    const fullPathWithParamsAndQuery = level22Route.generatePath({ params: { level22: 'test' }, queries: { name: 1 } })
    expect(fullPathWithParamsAndQuery).toBe('/level1/test?name=1')
})
