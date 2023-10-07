import { RouterModule } from '@viness/react';
import {
    DashboardPage1Route,
    DashboardPage2Route,
    DashboardPage3Route,
    DashboardRoute,
    ProjectPage2Route,
    ProjectPage3Route,
    ProjectRoute,
    RootRoute
} from './routes.protocol';
import { Module } from '@viness/core';

const routeTree: any = [
    {
        route: RootRoute,
        children: [
            { route: DashboardRoute, children: [DashboardPage1Route, DashboardPage2Route, DashboardPage3Route] },
            { route: ProjectRoute, children: [ProjectPage2Route, ProjectPage3Route] }
        ]
    }
];

@Module({
    imports: [RouterModule.forRoot({ type: 'browser', routeTree })]
})
export class AppRouteModule {}
