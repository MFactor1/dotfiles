declare type selector<S> = (state: S) => any;
export declare function useSelector<S>(selector: selector<S>): any;
export {};
