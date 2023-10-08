export type Consumer<T> = (arg: T) => void;
export type Provider<T> = () => T;
export type Transform<T> = (arg: T) => T;
export type Callback = () => void;
