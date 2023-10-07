import { SELF_PARAM_DI_DEPs } from '../instantiation/constants';
import { ServiceId, ServiceIdentifier } from '../instantiation/service-identifier';
import * as _util from '../instantiation/util';

/**
 * Inject service instance to a constructor parameter
 *
 * @param id
 * @returns
 */
export function Inject<T>(serviceId: ServiceId): ServiceIdentifier<T> {
    if (_util.serviceIds.has(serviceId)) {
        return _util.serviceIds.get(serviceId)!;
    }

    const id: any = function (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }

        const deps = (Reflect.getOwnMetadata(SELF_PARAM_DI_DEPs, target) as Array<{ id: any; index: number }>) || [];
        deps.push({ id, index: parameterIndex });

        Reflect.defineMetadata(SELF_PARAM_DI_DEPs, deps, target);
    };

    id.toString = () => serviceId;

    _util.serviceIds.set(serviceId, id);

    return id as any;
}

/**
 * The *only* valid way to create a {{ServiceIdentifier}}.
 */
export function createInjectDecorator<T>(serviceId: ServiceId | ServiceIdentifier<T>): ServiceIdentifier<T> {
    if (typeof serviceId === 'function') {
        return serviceId;
    }
    return Inject(serviceId);
}
