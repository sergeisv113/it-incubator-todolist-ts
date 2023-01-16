import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

 //const callback = action(`Button 'add' was pressed inside the form`)

const onChangeCallback = action(`Title changed`)

export const EditableSpanBaseExample = () => {
    return (
        <>
            <EditableSpan
                title={'Start value'}
                onChange={onChangeCallback}
            />

        </>
    )
}
