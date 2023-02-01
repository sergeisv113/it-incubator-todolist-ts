import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackbars/ErrorSnackBar";

/*export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}*/


function AppWithRedux() {
    console.log('App is called')
/*CLI
GUI => CRUD
C+func
R+++++...func
U++func
D+func
class component & functional component
    BiznesLogick BLL: data+functional logick*/

    //id в отдельн переменн

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

                <LinearProgress color={'secondary'}/>

            </AppBar>

           <Container fixed>

               <TodolistsList />

           </Container>
        </div>
    );
}

export default AppWithRedux;
// all callback оборач в useCallback если он передается в component, но если передается в елемент(button onClick) , то нет!!, a all component оборач в React.memo