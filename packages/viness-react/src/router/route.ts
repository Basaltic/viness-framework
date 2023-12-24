import { ReactNode } from 'react';
import {
    generatePath as innerGeneratePath,
    IndexRouteObject,
    LazyRouteFunction,
    LoaderFunction,
    NonIndexRouteObject
} from 'react-router-dom';
import { NavigateOptions, PathParam } from './types';
import { IVinessRoute } from './route.protocol';
import type { VinessRouteMetadata } from './route.protocol';
import type { IVinessRouter } from './router.protocol';

/**
 * Route
 */
export class VinessRoute<Path extends string> implements IVinessRoute<Path> {
    id?: string;
    path: Path;
    element: ReactNode;
    errorElement?: React.ReactNode | null;
    Component?: React.ComponentType | null;
    ErrorBoundary?: React.ComponentType | null;
    hasErrorBoundary?: boolean;
    caseSensitive?: boolean;
    index?: boolean | undefined;
    lazy?: LazyRouteFunction<IndexRouteObject> | LazyRouteFunction<NonIndexRouteObject>;
    loader?: LoaderFunction | undefined;

    constructor(metadata: VinessRouteMetadata<Path>, public router: IVinessRouter) {
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
        const toPath = this.generateFullPath(params);
        this.router.navigate(toPath, option);
    }

    getParams() {
        return this.router.getParams<Path>();
    }

    generateFullPath(params?: { [key in PathParam<Path>]: string | null }) {
        const toPath = innerGeneratePath(this.path || '', params || ({} as any));
        return toPath;
    }

    isMatched() {
        const lastIndex = this.router.state.matches.length - 1;
        const match = this.router.state.matches[lastIndex];
        return match.pathname === this.path;
    }
}
