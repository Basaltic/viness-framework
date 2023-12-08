import { createBrowserRouter, NavigateFunction } from 'react-router-dom';
import { PathParam } from './types';
import { IVinessRoute } from './route.protocol';

export type ReactRouter = ReturnType<typeof createBrowserRouter>;

export interface IVinessRouter {
    state: ReactRouter['state'];

    /**
     * navigate to any path
     *
     * @param to
     * @param opts
     * @returns
     */
    navigate: NavigateFunction;

    /**
     * get current matched path params
     */
    getParams<Path extends string>(): { [key in PathParam<Path>]: string | null };

    /**
     * get current matched route instance
     */
    getRoute<Path extends string = any>(): IVinessRoute<Path>;
}
