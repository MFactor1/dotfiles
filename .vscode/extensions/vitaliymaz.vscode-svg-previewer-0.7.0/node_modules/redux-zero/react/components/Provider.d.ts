import * as React from "react";
import Props from "../../interfaces/Props";
import propValidation from "../../utils/propsValidation";
import Store from "../../interfaces/Store";
export default class Provider<S = any> extends React.Component<Props<S>> {
    static childContextTypes: {
        store: typeof propValidation;
    };
    getChildContext(): {
        store: Store<S>;
    };
    render(): JSX.Element;
}
