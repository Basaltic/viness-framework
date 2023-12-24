import { RouterModule } from '@viness/react';
import { routeTokens } from './routes.protocol';
import { Module } from '@viness/core';

@Module({
    imports: [RouterModule.forRoot({ type: 'browser', routeTokens: routeTokens })]
})
export class AppRouteModule {}
