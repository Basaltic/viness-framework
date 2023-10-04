import { ActionBus } from '../action-bus';
import { IActionHandler } from '../action.protocol';

class TestAction {
    constructor(public readonly name: string, public readonly desc: string) {}
}

class ActionHandler implements IActionHandler<TestAction> {
    execute(action: TestAction): Promise<void> | void {
        const { name, desc } = action;
        // do something
    }
}

const actionBus = new ActionBus();
