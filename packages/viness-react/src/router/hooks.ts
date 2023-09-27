import { ContaienrUtil } from '../container'
import { VinessRouteInjectionToken } from './route.protocol'
import { IVinessRouter } from './router.protocol'

export function useRouter() {
    const router = ContaienrUtil.resolve(IVinessRouter)
    return router
}

export function useRoute<Path extends string>(token: VinessRouteInjectionToken<Path>) {
    const route = ContaienrUtil.resolve(token)
    return route
}
