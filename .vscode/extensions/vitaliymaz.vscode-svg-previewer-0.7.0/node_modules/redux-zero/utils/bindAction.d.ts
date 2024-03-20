import Store from "../interfaces/Store";
import { Action } from "../types";
export default function bindAction<S>(action: Action<S>, store: Store<S>): (...args: any[]) => void | Promise<void>;
