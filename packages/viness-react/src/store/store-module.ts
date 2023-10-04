import { Module } from '../app';
import { ActionBus } from './action-bus';

@Module({
    providers: [ActionBus]
})
export class StoreModule {}
