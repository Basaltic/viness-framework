import { Inject, createInjectDecorator } from '../../decorator';
import { IApple } from './apple';

export interface IPerson {
    eatApple(): void;
}

export const IPerson = createInjectDecorator<Person>('IPerson');

export class Person implements IPerson {
    private count: number = 0;

    constructor(@Inject('IApple') private apple: IApple) {}

    eatApple(): void {
        console.log('I am jam -- ');
        this.apple.eat();
    }

    getAppleCount() {
        return this.count;
    }

    countApple(count: number = 1) {
        this.count += count;
    }
}
