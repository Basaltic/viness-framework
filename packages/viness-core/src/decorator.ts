import { inject, injectAll, injectable, Disposable } from '@viness/di';

/**
 *
 * @param metadata
 * @returns
 */
export const Injectable = injectable;

export const Inject = inject;

export const InjectAll = injectAll;

export type { Disposable };
