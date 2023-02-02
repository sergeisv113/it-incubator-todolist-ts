import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackbars/ErrorSnackBar";
import {AppRootState} from "../API/store";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";

/*export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}*/
type AppWithReduxType = {
    demo?: boolean
}


function AppWithRedux({demo = false}: AppWithReduxType) {
    console.log('App is called')
/*CLI
GUI => CRUD
C+func
R+++++...func
U++func
D+func
class component & functional component
    BiznesLogick BLL: data+functional logick*/
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)//pokaz progressa zagruzki

    return (
        <div className="App">

            <ErrorSnackbars/>

            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={"inherit"} aria-label={'menu'}>
                        <Menu />
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>

                {status === 'loading' && <LinearProgress color={'secondary'}/>}

            </AppBar>

           <Container fixed>

               <TodolistsList demo={demo}/>

           </Container>
        </div>
    );
}

export default AppWithRedux;
// all callback оборач в useCallback если он передается в component, но если передается в елемент(button onClick) , то нет!!, a all component оборач в React.memo