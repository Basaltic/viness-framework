import { createInjectDecorator } from '../decorator';
import { SyncDescriptor0 } from './descriptors';
import type { ServiceCollection } from './service-collection';
import { ServiceIdentifier } from './service-identifier';

// --- interfaces ------

export type BrandedService = {};

export interface IConstructorSignature<T, Args extends any[] = []> {
    new <Services extends BrandedService[]>(...args: [...Args, ...Services]): T;
}

export interface ServicesAccessor {
    get<T>(id: ServiceIdentifier<T>): T;
}

export const IInstantiationService = createInjectDecorator<IInstantiationService>('instantiationService');

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
    createInstance<T>(descriptor: SyncDescriptor0<T>): T;
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
