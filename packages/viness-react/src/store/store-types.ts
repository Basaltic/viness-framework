export interface Type<T = any> extends Function {
    new (...args: any[]): T;
}

export type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export type TAction<S> = (state: S, ...args: any) => void;
