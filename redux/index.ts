import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { fakeApi } from "./api";


export const store = configureStore({
                reducer: rootReducer,
                middleware: (getDefaultMiddleware)=>
                                getDefaultMiddleware({ serializableCheck: false })
                .concat(fakeApi.middleware),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 