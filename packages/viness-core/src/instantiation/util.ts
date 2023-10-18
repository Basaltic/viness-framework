import { SELF_PARAM_DI_DEPs } from './constants';
import { InjectionToken, ServiceIdentifier } from './service-identifier';

export const serviceIds = new Map<InjectionToken, ServiceIdentifier<any>>();

export function getServiceDependencies(ctor: any): { id: ServiceIdentifier<any>; index: number; optional: boolean }[] {
    const deps = Reflect.getOwnMetadata(SELF_PARAM_DI_DEPs, ctor) || [];
    return deps as any;
}
