import { Injectable } from '../../decorator';
import { IApple } from './apple';

@Injectable()
export class Anne {
    private random: number;

    constructor(@IApple private apple: IApple) {
        this.random = Math.random() * 100;
    }

    eatApple(): void {
        console.log('I am anne -- ', this.random);
        this.apple.eat();
    }
}
