import { createDecorator } from '../../instantiation'
import { IApple } from './apple'
import { IPerson } from './person'

export interface IJhon {
    _serviceBrand: undefined
    eatApple(): void
}

export const IJhon = createDecorator<IJhon>('IJhon')

export class Jhon implements IJhon {
    _serviceBrand: undefined
    private random: number

    constructor(@IPerson private person: IPerson) {
        this.random = Math.random() * 100
    }

    eatApple(): void {
        console.log('I am jhon -- ', this.random)
        this.person.eatApple()
    }
}
