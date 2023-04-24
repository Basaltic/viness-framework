import { generatePath } from 'react-router-dom'
import { test, assert } from 'vitest'
import { createVinessApp } from '../app'
import { IVinessRouter } from '../router'

test('app router', () => {
    const app = createVinessApp()

    const level1 = app.router.addRoute({ path: '/level1' })
    const level21 = app.router.addRoute({ path: 'level21' }, level1)
    const level22 = app.router.addRoute({ path: ':level22' }, level1)

    const level21Route = app.getService(level21)

    const fullPath1 = level21Route.getFullPath()
    assert(fullPath1, '/level1/level21')

    const level22Route = app.getService(level22)
    const fullPath2 = level22Route.getFullPath()
    assert(fullPath2, '/level1/:level22')
})