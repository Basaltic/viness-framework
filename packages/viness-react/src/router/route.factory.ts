import { ServiceIdentifier, createInjectDecorator } from '@viness/core';
import { VinessRouteMetadata, IVinessRoute } from './route.protocol';

/**
 * Create Route Token with extra metadata
 *
 * @param path
 * @param metadata
 * @returns
 */
export function createRoute<Path extends string>(
    path: Path,
    metadata?: Omit<VinessRouteMetadata<Path>, 'path'>
): ServiceIdentifier<IVinessRoute<Path>> {
    // generate an id to make sure the service id unique
    const id = Symbol(path);
    const token = createInjectDecorator<IVinessRoute<Path>>(id) as any;
    token.metadata = { ...metadata, path };
    return token;
}
