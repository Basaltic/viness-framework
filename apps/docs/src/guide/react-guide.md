# 在React框架中使用

## 安装React绑定包

```bash
npm install @viness/react --save
// or
yarn add @viness/react --save
// or
pnpm add @viness/react --save
```

## 初始化

在入口出添加VinessApp的组件

```jsx
import { VinessReactApp, VinessAppRouter } from '@viness/react';
import { createApp } from '@viness/core';

import { AppModule } from './app.module';


const app = createApp(AppModule);


export const App = () => {
    return (
        <VinessReactApp app={app}>
            <VinessAppRouter />
        </VinessReactApp>
    );
};
```
