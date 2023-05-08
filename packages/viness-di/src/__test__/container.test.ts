import { describe, test } from 'vitest'
import { Container } from '../container'
import { Apple, IApple } from './service/apple'
import { IPerson, Person } from './service/person'

describe('Container', () => {
    test('basic feature', () => {
        const container = new Container()

        container.register(IApple, Apple)
        container.register(IPerson, Person)

        const person = container.get(IPerson)

        person.eatApple()
    })

    test('child container', () => {
        const parentContainer = new Container()
        const childContainer = parentContainer.createChild()

        parentContainer.register(IApple, Apple)
        childContainer.register(IPerson, Person)

        const person = childContainer.get(IPerson)

        person.eatApple()
    })
})
