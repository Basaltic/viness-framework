import { container } from '../app/container'
import { createModule } from '../app/module'
import { VinessRouter } from './router'
import { IVinessRouter, RouterConfig } from './router.interface'

export function createRouterModule(config: RouterConfig) {
    const module = createModule()

    // TODO: createRouter hear

    module.register(IVinessRouter, VinessRouter, [config])
    return module
}
