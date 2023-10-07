import { createInjectDecorator } from '../../decorator';

export interface IApple {
    eat(): void;
}

export const IApple = createInjectDecorator<IApple>('IApple');

export class Apple implements IApple {
    eat() {
        console.log('eat apple');
    }
}
