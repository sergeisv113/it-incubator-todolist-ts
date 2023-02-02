import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {AppRootState} from "../../API/store";
import {useDispatch, useSelector} from "react-redux";
import {setErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  function ErrorSnackbars()  {
    // const [open, setOpen] = React.useState(true);

   /* const handleClick = () => {
        setOpen(true);
    };*/

    /*const error = useSelector<AppRootState, string | null>(state => state.app.error)
    const dispatch = useDispatch()*/
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))//zanuli posle vuvoda error
        // setOpen(false);
    };

    const isOpen = error !== null

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
          {/*  <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button>*/}
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    <span>{error}</span>
                    {/*<span>This is an error message!</span>*/}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert>*/}
        </Stack>
    );
}