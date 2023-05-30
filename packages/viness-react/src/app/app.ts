import { Container, ServiceIdentifier, ServiceInstanceIdentifier, SyncDescriptor } from '@viness/di'
import { enableMapSet, enablePatches } from 'immer'
import { VinessRouter } from '../route/router'
import { IVinessRouter } from '../route/router.interface'

export interface IVInessApp {}

export class VinessApp {
    private container: Container
    constructor() {
        const container = new Container()
        const routerDescriptor = new SyncDescriptor(VinessRouter, [container])
        container.register(IVinessRouter, routerDescriptor)

        this.container = container

        enableMapSet()
        enablePatches()
    }

    get router() {
        return this.container.resolve(IVinessRouter)
    }

    register<T>(id: ServiceIdentifier<T>, service: SyncDescriptor<any> | (new (...services: any[]) => T)): void {
        return this.container.register(id, service)
    }

    resolve<T>(id: ServiceIdentifier<T>, instanceId?: ServiceInstanceIdentifier) {
        return this.container.resolve(id, instanceId)
    }
}

export function createApp() {
    return new VinessApp()
}
