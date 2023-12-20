import { Inject, Injectable } from '../../decorator';
import { Apple } from './apple';
import type { IApple } from './apple';

@Injectable()
export class Anne {
    private random: number;

    constructor(@Inject(Apple) private apple: IApple) {
        this.random = Math.random() * 100;
    }

    eatApple(): void {
        console.log('I am anne -- ', this.random);
        this.apple.eat();
    }
}
