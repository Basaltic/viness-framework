import { InjectableServiceId } from '../../token';

export function Inject(id: InjectableServiceId): ParameterDecorator {
    return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
        console.log(target, propertyKey, parameterIndex);
    };
}
