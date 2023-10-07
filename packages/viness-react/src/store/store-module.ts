import { Module } from '@viness/core';
import { ActionDispatcher } from './action-dispatcher';

@Module({
    providers: [ActionDispatcher]
})
export class StoreModule {}
