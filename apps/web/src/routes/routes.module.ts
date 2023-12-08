import { RouterModule } from '@viness/react';
import { routes } from './routes.protocol';
import { Module } from '@viness/core';

// const routeTree: any = [
//     {
//         route: RootRoute,
//         children: [
//             { route: DashboardRoute, children: [DashboardPage1Route, DashboardPage2Route, DashboardPage3Route] },
//             { route: ProjectRoute, children: [ProjectPage2Route, ProjectPage3Route] }
//         ]
//     }
// ];

@Module({
    imports: [RouterModule.forRoot({ type: 'browser', routes: routes })]
})
export class AppRouteModule {}
