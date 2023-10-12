import { INJECTABLE_METADATA } from '../instantiation/constants';
import { ServiceId, ServiceIdentifier } from '../instantiation/service-identifier';

export interface InjectableMetadata {
    id?: ServiceId | ServiceIdentifier<any>;
}

export const serviceIdToId = new Map();

/**
 * Make a class to be an injectable service
 */
export function Injectable(metadata?: InjectableMetadata): ClassDecorator {
    return (target: any) => {
        if (!Reflect.hasOwnMetadata(INJECTABLE_METADATA, target)) {
            if (metadata?.id) {
                Reflect.defineMetadata(INJECTABLE_METADATA, metadata, target);
            } else {
                let id = serviceIdToId.get(target);
                if (!id) {
                    id = Symbol(target.name);
                    serviceIdToId.set(target, id);
                }

                Reflect.defineMetadata(INJECTABLE_METADATA, { ...metadata, id }, target);
            }
        }
    };
}
