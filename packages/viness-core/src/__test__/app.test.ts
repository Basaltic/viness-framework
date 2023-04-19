import { inject } from 'inversify'
import { test } from 'vitest'
import { VinessApp } from '../app'
import { injectable } from '../container'
import { SuperRoute } from '../router'

@injectable()
class RouteA extends SuperRoute {
    constructor() {
        super({ id: '', path: '/test', element: null })
    }
}

@injectable()
class TestA {
    private route: RouteA
    constructor(@inject(RouteA) route: RouteA) {
        this.route = route
    }

    toString() {
        console.log('Hello World, Test!')
        return 'test'
    }

    toPathString() {
        const path = this.route.toString({})
        console.log(path)
        return path
    }
}

test('app', () => {})
