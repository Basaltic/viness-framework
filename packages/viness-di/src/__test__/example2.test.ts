import { describe, test } from 'vitest'
import { InstantiationService } from '../instantiation-service'
import { ServiceRegistry } from '../service-registry'
import { IApple, Apple } from './service/apple'
import { IJhon, Jhon } from './service/jhon'
import { IPerson, Person } from './service/person'

describe('DI', () => {
    test('example', () => {
        const registory1 = new ServiceRegistry()
        registory1.register(IApple, Apple)
        const serviceCollection = registory1.toServiceCollection()
        const instantiationService = new InstantiationService(serviceCollection, true)

        const registory2 = new ServiceRegistry()
        registory2.register(IApple, Apple)
        registory2.register(IPerson, Person)
        const serviceCollection2 = registory2.toServiceCollection()
        const instantiationService2 = new InstantiationService(serviceCollection2, true)

        const registory3 = new ServiceRegistry()
        registory3.register(IJhon, Jhon)
        const serviceCollection3 = registory3.toServiceCollection()

        const is31 = instantiationService.createChild(serviceCollection3)
        const is32 = instantiationService2.createChild(serviceCollection3)

        const jhon1 = is31.invokeFunction((a) => a.get(IJhon))
        jhon1.eatApple()

        const jhon2 = is32.invokeFunction((a) => a.get(IJhon))
        jhon2.eatApple()
    })
})
