import React from "react";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";


export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux
}

//const callback = action(`Button 'add' was pressed inside the form`)

const onChangeCallback = action(`Title changed`)

export const AppWithReduxBaseExample = () => {
    return <Provider store={store}>
               <AppWithRedux/>
           </Provider>
}
