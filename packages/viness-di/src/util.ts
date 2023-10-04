import { ServiceIdentifier } from './instantiation';

export const serviceIds = new Map<string | Symbol, ServiceIdentifier<any>>();

export const DI_TARGET = '$di$target';
export const DI_DEPENDENCIES = '$di$dependencies';

export function getServiceDependencies(ctor: any): { id: ServiceIdentifier<any>; index: number; optional: boolean }[] {
    const deps = Reflect.getOwnMetadata(DI_DEPENDENCIES, ctor) || [];

    return deps as any;
}
