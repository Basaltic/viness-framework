import { HANDLER_COMMANDS } from '../constants';

/**
 * Make a class to be an injectable service
 */
export function Command(name?: string): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        let commands = Reflect.getOwnMetadata(HANDLER_COMMANDS, target) as Array<{ name: string; propertyKey: string | symbol }>;

        const commandMeta = { name: name || propertyKey.toString(), propertyKey };

        if (commands) {
            commands.push(commandMeta);
        } else {
            commands = [commandMeta];
            Reflect.defineMetadata(HANDLER_COMMANDS, commands, target);
        }
    };
}
