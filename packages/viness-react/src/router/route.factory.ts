import { TokenType, createToken } from '../token'
import { generateId } from '../utils'
import { IVinessRoute, VinessRouteInjectionToken, VinessRouteMetadata } from './route.protocol'

/**
 * Create Route Token with extra metadata
 *
 * @param path
 * @param metadata
 * @returns
 */
export function createRoute<Path extends string>(path: Path, metadata?: Omit<VinessRouteMetadata<Path>, 'path'>) {
    // generate an id to make sure the service id unique
    const id = generateId()
    const token = createToken<IVinessRoute<Path>>(`${path || 'route'}_${id}`) as VinessRouteInjectionToken<Path>
    token.metadata = { ...metadata, path }
    token.tokenType = TokenType.Route
    return token
}
