import type * as descriptors from './descriptors';
import type { ServiceCollection } from './service-collection';
import * as _util from './util';

// --- interfaces ------

export type BrandedService = {};

export interface IConstructorSignature<T, Args extends any[] = []> {
    new <Services extends BrandedService[]>(...args: [...Args, ...Services]): T;
}

export interface ServicesAccessor {
    get<T>(id: ServiceIdentifier<T>): T;
}

export const IInstantiationService = createDecorator<IInstantiationService>('instantiationService');

/**
 * Given a list of arguments as a tuple, attempt to extract the leading, non-service arguments
 * to their own tuple.
 */
type GetLeadingNonServiceArgs<Args> = Args extends [...BrandedService[]]
    ? []
    : Args extends [infer A, ...BrandedService[]]
    ? [A]
    : Args extends [infer A, ...infer R]
    ? [A, ...GetLeadingNonServiceArgs<R>]
    : never;

export interface IInstantiationService {
    readonly _serviceBrand: undefined;

    /**
     * Synchronously creates an instance that is denoted by the descriptor
     */
    createInstance<T>(descriptor: descriptors.SyncDescriptor0<T>): T;
    createInstance<Ctor extends new (...args: any[]) => any, R extends InstanceType<Ctor>>(
        ctor: Ctor,
        ...args: GetLeadingNonServiceArgs<ConstructorParameters<Ctor>>
    ): R;

    /**
     * Calls a function with a service accessor.
     */
    invokeFunction<R, TS extends any[] = []>(fn: (accessor: ServicesAccessor, ...args: TS) => R, ...args: TS): R;

    /**
     * Creates a child of this service which inherits all current services
     * and adds/overwrites the given services.
     */
    createChild(services: ServiceCollection): IInstantiationService;
}

/**
 * Identifies a service of type `T`.
 */
export interface ServiceIdentifier<T> {
    (...args: any[]): void;
    type: T;
}

export type ServiceInstanceIdentifier = string | number;

/**
 * The *only* valid way to create a {{ServiceIdentifier}}.
 */
export function createDecorator<T>(serviceId: any): ServiceIdentifier<T> {
    if (_util.serviceIds.has(serviceId)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return _util.serviceIds.get(serviceId)!;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    const id = <any>function (target: Function, key: string, index: number): any {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }

        const deps = (Reflect.getOwnMetadata(_util.DI_DEPENDENCIES, target) as Array<{ id: any; index: number }>) || [];

        deps.push({ id, index });

        Reflect.defineMetadata(_util.DI_DEPENDENCIES, deps, target);
    };

    id.toString = () => serviceId;

    _util.serviceIds.set(serviceId, id);
    return id;
}
