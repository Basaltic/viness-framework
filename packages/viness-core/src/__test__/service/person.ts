import { Inject, Injectable } from '../../di/decorator';
import { Apple } from './apple';
import type { IApple } from './apple';
export interface IPerson {
    eatApple(): void;
}

@Injectable()
export class Person implements IPerson {
    private count: number = 0;

    constructor(@Inject(Apple) private apple: IApple) {}

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
