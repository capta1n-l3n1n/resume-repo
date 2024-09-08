export declare type Dictionary<Type = any> = {
    [key: string]: Type;
};

export declare type TypeOf<T> = {
    new (...args: any[]): T;
};