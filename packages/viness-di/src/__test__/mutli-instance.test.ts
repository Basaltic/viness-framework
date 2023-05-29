import { describe, expect, test } from 'vitest'
import { Container } from '../container'
import { Apple, IApple } from './service/apple'
import { IPerson, Person } from './service/person'

describe('Multi Service Instance', () => {
    test('Basic', () => {
        const container = new Container()

        container.register(IApple, Apple)
        container.register(IPerson, Person)

        const person1 = container.resolve(IPerson)
        const person2 = container.resolve(IPerson, 'test')

        person1.countApple(100)
        expect(person1.getAppleCount()).toBe(100)
        expect(person2.getAppleCount()).toBe(0)
    })
})
