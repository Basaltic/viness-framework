import { Inject, Injectable } from '../../di/decorator';
import { Apple } from './apple';
import type { IApple } from './apple';

export interface IAlice {
    eatApple(): void;
}

@Injectable()
export class Alice implements IAlice {
    private random: number;

    constructor(@Inject(Apple) private apple: IApple) {
        this.random = Math.random() * 100;
    }

    eatApple(): void {
        console.log('I am alice -- ', this.random);
        this.apple.eat();
    }
}
