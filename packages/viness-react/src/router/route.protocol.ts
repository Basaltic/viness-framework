import { RouteObject, NavigateOptions } from 'react-router-dom';
import { PathParam } from './types';
import { InjectionToken } from '@viness/core';

export interface VinessRouteMetadata<Path extends string> {
    id?: string;
    path: Path;
    index?: boolean;
    element?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    hasErrorBoundary?: boolean;
    caseSensitive?: boolean;
    ErrorBoundary?: React.ComponentType | null;
    Layout?: React.ComponentType | null;
    Component?: React.ComponentType | null;
    lazy?: RouteObject['lazy'];
    action?: RouteObject['action'];
    loader?: RouteObject['loader'];
    parent?: InjectionToken<any>;
}

export interface IVinessRoute<Path extends string> extends VinessRouteMetadata<Path> {
    /**
     *
     * @param option
     * @returns
     */
    navigate: (params: { [key in PathParam<Path>]: string | null }, option?: NavigateOptions) => void;

    /**
     *
     * @param params
     * @returns
     */
    generateFullPath: (params: { [key in PathParam<Path>]: string | null }) => string;

    /**
     *
     * @returns
     */
    getParams: () => { [key in PathParam<Path>]: string | null };

    isMatched(): boolean;
}
