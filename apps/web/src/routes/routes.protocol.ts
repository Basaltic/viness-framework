import { createRouteToken, useResolve } from '@viness/react';
import { DashboardLayout } from '../features/dashboard/dashboard';
import { DashboardPage1 } from '../features/dashboard/pages/page1';
import { DashboardPage2 } from '../features/dashboard/pages/page2';
import { DashboardPage3 } from '../features/dashboard/pages/page3';

export const RootRoute = createRouteToken('/');

export const DashboardRoute = createRouteToken('/d/:pid', { Component: DashboardLayout });

export const DashboardPage1Route = createRouteToken('', { parent: DashboardRoute, Component: DashboardPage1 });

export const DashboardPage2Route = createRouteToken('p2', { parent: DashboardRoute, Component: DashboardPage2 });
export const useDashboardPage2Route = () => useResolve(DashboardPage2Route);

export const DashboardPage3Route = createRouteToken('p3', { parent: DashboardRoute, Component: DashboardPage3 });
export const useDashboardPage3Route = () => useResolve(DashboardPage3Route);

export const ProjectRoute = createRouteToken('/p', { Component: DashboardLayout });

export const ProjectPage1Route = createRouteToken('', { parent: ProjectRoute, Component: DashboardPage1 });

export const ProjectPage2Route = createRouteToken('p2', { parent: ProjectRoute, Component: DashboardPage2 });

export const ProjectPage3Route = createRouteToken('p3', { parent: ProjectRoute, Component: DashboardPage3 });

export const routeTokens = [
    RootRoute,
    DashboardRoute,
    DashboardPage1Route,
    DashboardPage2Route,
    DashboardPage3Route,
    ProjectRoute,
    ProjectPage1Route,
    ProjectPage2Route,
    ProjectPage3Route
];
