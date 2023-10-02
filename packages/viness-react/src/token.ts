import { createDecorator, ServiceIdentifier } from '@viness/di'

export enum TokenType {
    /**
     *
     */
    Normal = 1,
    Route = 2,
    Store = 3
}

/**
 *
 */
export type VinessInjectionToken<T = any> = ServiceIdentifier<T> & {
    tokenType: TokenType
}

/**
 * create service token
 *
 * @param serviceId
 * @returns
 */
export function createToken<T>(serviceId: string | Symbol): VinessInjectionToken<T> {
    const token = createDecorator(serviceId) as VinessInjectionToken<T>

    token.tokenType = TokenType.Normal

    return token
}
