import { RouteObject } from 'react-router';

export interface IRouterConfig {
    type: 'hash' | 'browser' | 'memory';
    routes: RouteObject[];
    basename?: string;
}

export const RouterConfigToken = Symbol('RouterConfigToken');
