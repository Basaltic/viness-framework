import { VinessRoute } from '@viness/core'

export const test1 = new VinessRoute({ id: '', path: '/test1', element: <div></div> })

export class TestRoute extends VinessRoute {
    constructor() {
        super({ id: '', path: '/test1', element: <div></div> })
    }
}
