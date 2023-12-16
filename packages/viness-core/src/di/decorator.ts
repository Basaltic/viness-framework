import { inject, injectable, interfaces } from 'inversify';

export type Scope = interfaces.BindingScope;

/**
 *
 * @param metadata
 * @returns
 */
export const Injectable = injectable;

export const Inject = inject;
