import { ReactNode } from 'react';
import { generatePath as innerGeneratePath, LoaderFunction, RouteObject } from 'react-router-dom';
import { NavigateOptions, PathParam } from './types';
import type { VinessRouteMetadata } from './route.protocol';
import { VinessRouter } from './router';
import { InjectionToken } from '@viness/core';
import { toFullPath } from './route-tree';

/**
 * Route
 */
export class VinessRoute<Path extends string> {
    id?: string;
    path: Path;
    element: ReactNode;
    errorElement?: React.ReactNode | null;
    Component?: React.ComponentType | null;
    ErrorBoundary?: React.ComponentType | null;
    hasErrorBoundary?: boolean;
    caseSensitive?: boolean;
    index?: boolean | undefined;
    lazy?: RouteObject['lazy'];
    loader?: LoaderFunction | undefined;

    constructor(private token: InjectionToken<any>, metadata: VinessRouteMetadata<Path>, public router: VinessRouter) {
        const { id, path, index, element, errorElement, Component, ErrorBoundary, hasErrorBoundary, caseSensitive, lazy, loader } =
            metadata;

        this.id = id;
        this.path = path;
        this.index = index;
        this.element = element;
        this.errorElement = errorElement;
        this.Component = Component;
        this.ErrorBoundary = ErrorBoundary;
        this.hasErrorBoundary = hasErrorBoundary;
        this.caseSensitive = caseSensitive;
        this.lazy = lazy;
        this.loader = loader;
    }

    navigate(params: { [key in PathParam<Path>]: string | null }, option?: NavigateOptions) {
        const toPath = this.generatePath(params);
        this.router.navigate(toPath, option);
    }

    getParams() {
        return this.router.getParams<Path>();
    }

    generatePath(params?: { [key in PathParam<Path>]: string | null }) {
        const fullPath = toFullPath(this.token);
        const toPath = innerGeneratePath(fullPath || '', params || ({} as any));
        return toPath;
    }

    isMatched() {
        const lastIndex = this.router.state.matches.length - 1;
        const match = this.router.state.matches[lastIndex];
        return match.pathname === this.path;
    }
}
