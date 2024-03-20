import Store from "../interfaces/Store";
export interface NextAction {
    key: string;
    fn: Function;
}
export interface Action {
    type: string;
    name: string;
}
export interface ReduxAction {
    type: string;
    args: any[];
}
export interface MessageState {
    actionsById: {
        [index: string]: {
            action: Action;
        };
    };
    computedStates: Store;
}
export interface Message {
    state: string;
    payload: {
        id: number;
        type: string;
    };
    type: string;
}
interface DevToolsStoreExtraParams {
    send: (type: string | ReduxAction, state: object) => void;
    subscribe: (update?: object) => void;
}
export declare type DevToolsStore = Pick<Store, Exclude<keyof Store, keyof DevToolsStoreExtraParams>> & DevToolsStoreExtraParams;
export interface DevTools {
    instance: DevToolsStore | null;
}
declare let devTools: DevTools;
declare let connect: any;
declare function getOrAddAction(action: Action, fn: Function): NextAction;
declare function update<T extends Store>(this: T, message: Message): void;
declare const devtoolsMiddleware: (store: Store<any>) => (next: Function, args: any) => (action: Action) => any;
export { devtoolsMiddleware, connect, update, devTools, getOrAddAction };
