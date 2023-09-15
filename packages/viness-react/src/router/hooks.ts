import { ContaienrUtil } from '../app/container'
import { VinessRouteIdentifer } from './route.protocol'
import { IVinessRouter } from './router.protocol'

export function useRouter() {
    const router = ContaienrUtil.get(IVinessRouter)
    return router
}

export function useRoute<Path extends string>(token: VinessRouteIdentifer<Path>) {
    const route = ContaienrUtil.get(token)
    return route
}
