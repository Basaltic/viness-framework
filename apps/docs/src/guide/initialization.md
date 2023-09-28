# 初始化框架 & 快速开始

### 创建 VinessApp 实例

```ts
// app.module.ts
import { createModule, Module } from '@viness/react'

export const appModule = createModule({
    imports: [routerModule, dashboardModule]
})


```

### 引入 VinessReactApp 组件

- 把 VinessReactApp 组件放置在整个应用的最外层
```tsx

import { AppFactory, VinessReactApp } from '@viness/react'
import { appModule } from './app.module'

export const App = () => {
    const app = AppFactory.create(appModule)

    return (
        <VinessReactApp app={app}>
            {/* 自定义的组件 */}
            <YourCustomComponents />
        </VinessReactApp>
    )
}
```


### 配置路由信息 & 组件

- 如果 Viness 框架自带的路由组件，则可以直接引入 VinessAppRouter 组件，具体配置见路由章节
```tsx
import { AppFactory, VinessReactApp, VinessAppRouter } from '@viness/react'
import { appModule } from './app.module'

export const App = () => {
    const app = AppFactory.create(appModule)

    return (
        <VinessReactApp app={app}>
            <VinessAppRouter />
        </VinessReactApp>
    )
}
```
