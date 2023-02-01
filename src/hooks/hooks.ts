

// Use throughout your app instead of plain `useDispatch` and `useSelector`
import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootState} from "../API/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector