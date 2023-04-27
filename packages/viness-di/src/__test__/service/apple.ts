import { createDecorator } from '../../instantiation'

export interface IApple {
    eat(): void
}

export const IApple = createDecorator<IApple>('IApple')

export class Apple implements IApple {
    eat() {
        console.log('eat apple')
    }
}
