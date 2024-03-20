import Store from "../interfaces/Store";
declare function createStore<S extends object = any>(): Store<Partial<S>>;
declare function createStore<S extends object = any>(initialState?: S, middleware?: any): Store<S>;
declare function createStore<S extends object = any>(initialState?: Partial<S>, middleware?: any): Store<Partial<S>>;
export default createStore;
