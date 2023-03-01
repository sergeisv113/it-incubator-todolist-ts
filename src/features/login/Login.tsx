import React from 'react';
import {Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@material-ui/core";
import {CheckBox} from "@mui/icons-material";
import {useFormik} from "formik";
import {loginTC} from "./login-reducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {AppRootState} from "../../API/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            console.log('validate')
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })


    if (isLoggedIn) {
        return <Navigate to={'/'}/> //= Redirect po staromu
    }

    return (
        <Grid container justify='center'>
            <Grid item xs={4}>
               {/* <form onSubmit={(e) => {
                   e.preventDefault();// bez perezagruzki
                   alert('submit')
                }}>*/}
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel/>
                        <FormGroup>
                            <TextField
                                label={'Email'}
                                margin={'normal'}
                                {...formik.getFieldProps('email')}
                                //props
                            />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField
                                type={'password'}
                                label={'Password'}
                                margin={'normal'}
                                {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<CheckBox
                                    {...formik.getFieldProps('rememberMe')}
                                       //     checked={formik.values.rememberMe}
                                />}
                            />
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};

export default Login;