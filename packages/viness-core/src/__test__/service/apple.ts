import { Injectable } from '../../decorator';

export interface IApple {
    eat(): void;
}

@Injectable()
export class Apple implements IApple {
    eat() {
        console.log('eat apple');
    }
}
