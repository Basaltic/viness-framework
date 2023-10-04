import { ContaienrUtil } from './container';
import { createToken } from './token';
import { INJECTABLE_METADATA, InjectableMetadata } from './app';

/**
 * Resolve service instance in component
 *
 * @param id
 * @returns
 */
export function useResolve<T>(id: any): T {
    const idType = typeof id;

    let token: any;
    if (idType === 'string' || idType === 'symbol') {
        token = createToken(id);
    } else if (idType === 'function') {
        token = id;
    } else {
        const metadata = Reflect.getOwnMetadata<InjectableMetadata>(INJECTABLE_METADATA, id);
        if (metadata?.id) {
            token = createToken(id);
        } else if (metadata?.token) {
            token = metadata.token;
        }
    }

    return ContaienrUtil.resolve(token) as T;
}
