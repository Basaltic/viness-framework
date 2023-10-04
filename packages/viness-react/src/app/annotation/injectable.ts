import { ServiceIdentifier } from '@viness/di';
import { InjectableServiceId, VinessInjectionToken } from '../../token';

export const INJECTABLE_METADATA = '$viness:injectable_metadata';

export const tokenToService = new Map<ServiceIdentifier<any>, any>();

export interface InjectableMetadata {
    id?: InjectableServiceId;
    token?: VinessInjectionToken;
}

/**
 *
 */
export function Injectable(metadata?: InjectableMetadata): ClassDecorator {
    return (target: any) => {
        if (!Reflect.hasOwnMetadata(INJECTABLE_METADATA, target)) {
            Reflect.defineMetadata(INJECTABLE_METADATA, metadata, target);
        }
    };
}
