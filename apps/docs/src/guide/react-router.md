# 路由

## 定义路由

```ts
// 定义在任意文件中
import { createRouteToken, useResolve } from '@viness/react';

export const rootRouteToken = createRouteToken('/');

// parent用来定义路由的父子关系
export const dashboardRouteToken = createRouteToken('/d/:pid', { parent: rootRouteToken Component: DashboardLayout });

export const useDashboardRoute = () => useResolve(dashboardRouteToken);
```

## 定义路由模块

```ts
import { RouterModule } from '@viness/react';
import { Module } from '@viness/core';

import { rootRouteToken, dashboardRouteToken } from 'some-file';

@Module({
    imports: [RouterModule.forRoot({ type: 'browser', routeTokens: [rootRouteToken, dashboardRouteToken] })]
})
export class AppRouterModule {}
```
