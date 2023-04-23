import { describe, test } from 'vitest'
import { Container } from '../container'
import { Apple, IApple } from './service/apple'
import { IPerson, Person } from './service/person'

describe('Di Container', () => {
    test('Basic Feature', () => {
        const container = new Container()

        container.register(IApple, Apple)
        container.register(IPerson, Person)

        const person = container.get(IPerson)

        person.eatApple()
    })
})
