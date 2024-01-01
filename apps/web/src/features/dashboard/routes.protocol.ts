import { createRouteProvider, useResolve } from '@viness/react';
import { DashboardLayout } from './dashboard';
import { DashboardPage1 } from './pages/page1';
import { DashboardPage2 } from './pages/page2';
import { DashboardPage3 } from './pages/page3';

export const RootRouteProvider = createRouteProvider('/');

export const DashboardRouteProvider = createRouteProvider('/d', { Component: DashboardLayout });

export const DashboardPage1RouteProvider = createRouteProvider('p1', { parent: DashboardRouteProvider.token, Component: DashboardPage1 });

export const DashboardPage2RouteProvider = createRouteProvider('p2', { parent: DashboardRouteProvider.token, Component: DashboardPage2 });
export const useDashboardPage2Route = () => useResolve(DashboardPage2RouteProvider.token);

export const DashboardPage3RouteProvider = createRouteProvider('p3', { parent: DashboardRouteProvider.token, Component: DashboardPage3 });
export const useDashboardPage3Route = () => useResolve(DashboardPage3RouteProvider.token);
