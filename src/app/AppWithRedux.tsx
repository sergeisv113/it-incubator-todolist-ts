import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackbars/ErrorSnackBar";
import {AppRootState} from "../API/store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";
import Login from "../features/login/Login";
import {Link, Route, Routes} from 'react-router-dom';
import {CircularProgress} from "@mui/material";
import {useAppDispatch} from "../hooks/hooks";
import {logoutTC} from "../features/login/login-reducer";

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
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {//delet kuka
        dispatch(logoutTC())
    }, [])


    if (!isInitialized) {
        return  <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress />
        </div>
    }

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
                      {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}>Log out</Button>}
                      {/*//esli zalogineny, pokaz btn*/}
                  </Toolbar>
                  {status === 'loading' && <LinearProgress color={'secondary'}/>}
              </AppBar>
              <Container fixed>
                  <Routes>
                      <Route  path={'/*'} element={ <TodolistsList demo={demo}/>}/>
                      <Route path={'/login'} element={ <Login/> }/>
                  </Routes>
              </Container>
          </div>
    );
}

export default AppWithRedux;
// all callback оборач в useCallback если он передается в component, но если передается в елемент(button onClick) , то нет!!, a all component оборач в React.memo