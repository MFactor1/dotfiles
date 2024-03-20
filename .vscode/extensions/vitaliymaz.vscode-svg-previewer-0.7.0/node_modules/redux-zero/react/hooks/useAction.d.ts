import { Action } from "../../types";
export declare function useAction<S>(action: Action<S>): (...args: any[]) => Promise<void> | void;
