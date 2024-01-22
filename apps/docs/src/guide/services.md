# 服务

一般会把一些业务逻辑抽象到一个特定的逻辑单元中统一管理，这个逻辑单元被称为「服务」。

## 服务标识（Token）

Token的主要作用

1. 服务的唯一标识
2. 用于服务的TS类型自动推导
3. 作为服务的特定注入器使用

## 如何使用

### 创建服务

```ts
// some-service.ts
import { createInjectionToken, Injectable } from '@viness/core'

// 通常把 Token 和 接口（interface）定义一致
export interface ISomeService {
    methodA: () => void;
}
export const ISomeService = createInjectionToken<ISomeService>('ISomeService')

@Injectable()
export class SomeService implement ISomeService {
}
```

### 在模块引入

```ts
// some-module.ts
import { createModule } from '@viness/react'
import { SomeService, ISomeService } from ''

// 方式 1
export const customModule = createModule({
    imports: [],
    // 有 @Injectable 装饰器的话，可以直接引入
    providers: [SomeService],
})

// or 方式 2
export const customModule = createModule({
    imports: [],
    // 手动的关联 token 和 服务
    providers: [{
        token: ISomeService
        useClass: SomeService
    }],
})

```

### 在服务中使用其他服务

```ts
// some-other-service.ts
import { createInjectionToken, Injectable } from '@viness/core'
import { ISomeService, SomeService } from './some-service.ts'

// 通常 在
export interface ISomeOtherService {
    methodA: () => void;
}
export const ISomeOtherService = createInjectionToken<ISomeOtherService>('ISomeOtherService')

@Injectable()
export class SomeOtherService implement ISomeOtherService {
    // 在构造器中注入，token也作为装饰器用来注入改服务的实例
    constructor(@ISomeService private someService: ISomeService)
}

// 或者 没有 token关联的话，类 本身就是token
@Injectable()
export class SomeOtherService implement ISomeOtherService {
    // 在构造器中注入，token也作为装饰器用来注入改服务的实例
    constructor(@Inject(SomeService) private someService: SomeService)
}
```
