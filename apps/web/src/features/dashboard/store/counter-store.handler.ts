import { ActionHandler, IActionHandler } from '@viness/react';
import { IncreaseAction } from './counter-store.action';
import { ICounterStore } from './counter-store.protocol';

@ActionHandler(IncreaseAction)
export class IncreaseActionHandler implements IActionHandler<IncreaseAction> {
    constructor(@ICounterStore private counterStore: ICounterStore) {}

    execute(action: IncreaseAction): Promise<any> | any {
        this.counterStore.setStateWithPatches((s) => {
            s.count += 1;
        });
    }
}

class XXActionHandler {}
