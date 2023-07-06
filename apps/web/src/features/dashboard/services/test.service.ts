import { Injectable, createDecorator } from '@viness/react'

export const ITestService = createDecorator<TestService>('ITestService')

@Injectable(ITestService)
export class TestService {
    sayHello() {
        console.log('hello world')
    }
}

export const ITest2Service = createDecorator<Test2Service>('ITest2Service')

@Injectable(ITest2Service)
export class Test2Service {
    constructor(@ITestService private testService: TestService) {}

    toJane() {
        console.log('hello Jane')
        this.testService.sayHello()
    }
}
