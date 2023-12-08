export interface Newable<T = any> extends Function {
    new (...args: any[]): T;
}
