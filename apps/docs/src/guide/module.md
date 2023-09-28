# 模块

Viness框架以「模块」的方式来组织应用的逻辑代码


## 定义模块
```ts
import { createModule, Module } from '@viness/react'

export const customModule = createModule({
    // 引入其他的模块
    imports: [],
    // 引入模块中的服务
    providers: [],
})

// 或者采用 类和装饰器的方式定义
@Module({
    // 引入其他的模块
    imports: [],
    // 引入模块中的服务
    providers: [],
})
export class CustomModule {

}

```

## 启动模块

- 每一个应用必须有一个启动「模块」以初始化应用实例
```ts
// app.module.ts
import { createModule } from '@viness/react'
import { routerModule } from './routes/routes.module'
import { dashboardModule } from './features/dashboard/dashboard.module'

export const appModule = createModule({
    imports: []
})
```

```ts
// app.tsx
import { AppFactory, VinessReactApp, VinessAppRouter } from '@viness/react'
import { appModule } from './app.module'

export const App = () => {
    // 创建应用实例的时候，需要传入应用的启动模块
    const app = AppFactory.create(appModule)

    return (
        <VinessReactApp app={app}>
            <VinessAppRouter />
        </VinessReactApp>
    )
}
```
