import Store from "../interfaces/Store";
export default function applyMiddleware(...middlewares: any[]): (store: Store<any>, action: Function, args: any) => any;
