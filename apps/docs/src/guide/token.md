# Token

Token是服务的唯一标识

## 作用

1. 服务的唯一标识
2. 用于服务的TS类型自动推导
3. 作为服务的特定注入器使用

## 命名

通常token的命名和接口名保持一致

## 例子

#### 在类中
```ts
// test.service.ts

import { createToken } from '@viness/react'

export const ITest = createToken<ITest>('Test')

interface ITest {

}

class Test extends ITest {
}

class Test2 {
    constructor(@ITest() test: ITest) {
    }
}
```

#### 在组件中

```ts
import { useResolve } from '@viness/react';

const TestComponent = () => {
    const testInstance = useResolve(ITest)

    // 使用testInstance
}

```
