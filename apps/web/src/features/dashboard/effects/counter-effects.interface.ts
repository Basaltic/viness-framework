import { createDecorator } from '@viness/react'

export const ICounterEffect = createDecorator<ICounterEffect>('ICounterEffect')

export interface ICounterEffect {
    increase(): void
}
