# @viness/di

A lightweight di framework base on vscode instantiation.

# Installation

```bash
npm install --save @viness/di
```

# Get Start

```ts
import { Container, createDecorator } from '@viness/di'

const container = new Container();

const ITestService = createDecorator('ITestService')

interface ITestService {
    hello(): void
}

class TestService implements ITestService {
    hello(): void {
        console.log('hello world');
    }
}

container.register(ITestService, TestService)
```
