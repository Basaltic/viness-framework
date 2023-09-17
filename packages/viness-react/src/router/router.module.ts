import { SyncDescriptor } from '@viness/di'
import { ContaienrUtil } from '../app/container'
import { createModule } from '../app/module/module'
import { VinessRouter } from './router'
import { IVinessRouter, RouterConfig } from './router.protocol'

function createRouterModule(config: RouterConfig) {
    const descriptor = new SyncDescriptor(VinessRouter, [config], true)
    ContaienrUtil.register(IVinessRouter, descriptor)

    const module = createModule({
        providers: []
    })
    return module
}

export class RouterModule {
    static forRoot(config: RouterConfig) {
        return createRouterModule(config)
    }
}
