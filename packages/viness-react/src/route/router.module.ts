import { createModule } from '../app/module'
import { VinessRouter } from './router'
import { IVinessRouter, RouterConfig } from './router.interface'

export function createRouterModule(config: RouterConfig) {
    const module = createModule()
    module.register(IVinessRouter, VinessRouter, [config])
    return module
}
