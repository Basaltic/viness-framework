import { describe, test } from 'vitest';
import { Container } from '../instantiation';
import { Apple, IApple } from './service/apple';
import { IPerson, Person } from './service/person';
import { DepsScanner } from '../module';
import { Alice, IAlice } from './service/alice';
import { Anne } from './service/anne';

describe('Container', () => {
    test('basic feature', () => {
        const container = new Container();

        container.register(IApple, Apple);
        container.register(IPerson, Person);

        const person = container.resolve(IPerson);

        person.eatApple();
    });

    test('child container', () => {
        const parentContainer = new Container();
        const childContainer = parentContainer.createChild();

        parentContainer.register(IApple, Apple);
        childContainer.register(IPerson, Person);

        const person = childContainer.resolve(IPerson);

        person.eatApple();
    });

    test('', () => {
        const container = new Container();
        const scanner = new DepsScanner(container);

        scanner.scanProvider(Anne);

        container.register(IApple, Apple);
        container.register(IPerson, Person);
        container.register(IAlice, Alice);

        const anne = container.resolve(Anne);

        anne.eatApple();
    });
});
