import React from "react";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {store} from "../API/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

//const callback = action(`Button 'add' was pressed inside the form`)

export const AppWithReduxBaseExample = () => {
    /*return <Provider store={store}>
               <AppWithRedux/>
           </Provider>*/
    return  <AppWithRedux demo={true}/>
}
