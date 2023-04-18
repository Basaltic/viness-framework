import { injectable, inject, Container } from 'inversify'

/**
 * Create Injectable Decorator
 *
 * @param id
 * @returns
 */
function createIdentifier(id: string) {
    const idSymbol = Symbol.for(id)
    return () => inject(idSymbol)
}

export { createIdentifier, injectable, Container }
