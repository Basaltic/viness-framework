import { SELF_PARAM_DI_DEPs } from '../instantiation/constants';
import { ServiceId, ServiceIdentifier } from '../instantiation/service-identifier';
import { serviceIds } from '../instantiation/util';
import { Type } from '../types';
import { serviceIdToId } from './injectable';

/**
 * Inject service instance to a constructor parameter
 *
 * @param id
 * @returns
 */
export function Inject<T>(serviceId: ServiceId): ServiceIdentifier<T> {
    if (serviceIds.has(serviceId)) {
        return serviceIds.get(serviceId)!;
    }

    const id: any = function (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }

        const type = Reflect.getMetadata('design:type', target);
        const deps = (Reflect.getOwnMetadata(SELF_PARAM_DI_DEPs, target) as Array<{ id: any; index: number }>) || [];

        if (serviceId) {
            deps.push({ id, index: parameterIndex });
        } else {
            const typeId = serviceIdToId.get(type);
            deps.push({ id: typeId, index: parameterIndex });
        }

        Reflect.defineMetadata(SELF_PARAM_DI_DEPs, deps, target);
    };

    id.toString = () => serviceId;

    serviceIds.set(serviceId, id);

    return id as any;
}

/**
 * The *only* valid way to create a {{ServiceIdentifier}}.
 */
export function createInjectDecorator<T>(serviceId: ServiceId | ServiceIdentifier<T> | Type<T>): ServiceIdentifier<T> {
    if (typeof serviceId === 'function') {
        const id = serviceIdToId.get(serviceId);
        if (id) {
            return Inject(id);
        }
        return serviceId as any;
    }
    return Inject(serviceId);
}
