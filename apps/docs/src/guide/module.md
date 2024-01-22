# 模块

Viness框架以「模块」的方式来组织应用的逻辑代码


## 定义模块
```ts
import { createModule, Module } from '@viness/core'

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

- 每一个应用必须有一个启动「模块」以初始化应用实例，通常

```ts
// app.module.ts
import { createModule } from '@viness/core'

export const AppModule = createModule({
    imports: []
    providers: []
})
// 或者使用 装饰器的方式
@Module({
    imports: []
    providers: []
})
export class AppModule {

}

```

- 创建一个App实例

```ts
// app.tsx
import { createApp } from '@viness/core'
import { AppModule } from './app.module'

export const app = createApp(AppModule)

```
