import { ContaienrUtil } from '../app/container'
import { VinessRouteInjectionToken } from './route.protocol'
import { IVinessRouter } from './router.protocol'

export function useRouter() {
    const router = ContaienrUtil.get(IVinessRouter)
    return router
}

export function useRoute<Path extends string>(token: VinessRouteInjectionToken<Path>) {
    const route = ContaienrUtil.get(token)
    return route
}
