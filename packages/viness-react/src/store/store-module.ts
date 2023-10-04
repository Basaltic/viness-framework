import { Module } from '../app';
import { ActionDispatcher } from './action-dispatcher';

@Module({
    providers: [ActionDispatcher]
})
export class StoreModule {}
