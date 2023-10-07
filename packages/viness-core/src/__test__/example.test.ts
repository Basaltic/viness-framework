import { describe, test } from 'vitest';
import { InstantiationService, ServiceRegistry } from '../instantiation';
import { Alice, IAlice } from './service/alice';
import { IApple, Apple } from './service/apple';
import { IPerson, Person } from './service/person';

describe('DI', () => {
    test('example', () => {
        const registory = new ServiceRegistry();
        registory.register(IApple, Apple);
        const serviceCollection = registory.getServiceCollection();
        const instantiationService = new InstantiationService(serviceCollection, true);

        const registory2 = new ServiceRegistry();
        registory2.register(IPerson, Person);
        const serviceCollection2 = registory2.getServiceCollection();

        const instantiationService2 = instantiationService.createChild(serviceCollection2);

        const instantiationService3 = instantiationService.createChild(serviceCollection2);

        const person = instantiationService2.invokeFunction((accessor) => accessor.get(IPerson));
        person.eatApple();

        console.log('start ---> alice');

        registory2.register(IAlice, Alice);
        const alice = instantiationService2.invokeFunction((accessor) => accessor.get(IAlice));
        alice.eatApple();

        console.log('start ---> alice 1');

        alice.eatApple();

        console.log('start ---> alice 2');

        const alice2 = instantiationService3.invokeFunction((accessor) => accessor.get(IAlice));
        alice2.eatApple();
    });
});
