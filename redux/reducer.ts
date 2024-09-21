import { combineReducers } from "@reduxjs/toolkit";
import { fakeApi } from "./api";



export const rootReducer = combineReducers({
                [fakeApi.reducerPath]: fakeApi.reducer
})