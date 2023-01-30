import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);//что бы не перерисов каждый раз
        }
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    return (
        <div>
{/*            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />*/}
            <TextField value={title}
                       variant={"outlined"}
                       label={'Enter type value'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                  error={!!error}//in boolean
                helperText={error}// text error
            />
            {/*<button onClick={addTask}>+</button>  // my comp*/}
            {/*<Button onClick={addTask} variant={"outlined"} color={"secondary"}>+</Button>*/}
            {/*/!*{error && <div className="error-message">{error}</div>}*!/ del + helperText*/}
            <IconButton onClick={addTask}  color={"secondary"}>
                <ControlPoint/>
            </IconButton>
        </div>

    )
});