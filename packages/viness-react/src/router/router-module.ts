import { createModule } from '../app/module'
import { VinessRouter } from './router'
import { IVinessRouter, RouterConfig } from './router.protocol'

function createRouterModule(config: RouterConfig) {
    const module = createModule()
    module.register(IVinessRouter, VinessRouter, [config])
    return module
}

export class RouterModule {
    static forRoot(config: RouterConfig) {
        return createRouterModule(config)
    }
}
