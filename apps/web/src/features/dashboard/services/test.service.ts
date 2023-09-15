import { Injectable, createToken } from '@viness/react'

export const ITestService = createToken<TestService>('ITestService')

@Injectable(ITestService)
export class TestService {
    sayHello() {
        console.log('hello world')
    }
}

export const ITest2Service = createToken<Test2Service>('ITest2Service')

@Injectable(ITest2Service)
export class Test2Service {
    constructor(@ITestService private testService: TestService) {}

    toJane() {
        console.log('hello Jane')
        this.testService.sayHello()
    }
}
