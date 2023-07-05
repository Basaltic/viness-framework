import { Injectable, createDecorator } from '@viness/react'

export const ITestService = createDecorator<TestService>('ITestService')

@Injectable(ITestService)
export class TestService {}
