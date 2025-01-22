import { configureStore } from "@reduxjs/toolkit";
import dndReducer from './dndSlice'

const store=configureStore({
    reducer:{
        dnd:dndReducer
    }
})

export type RootState = ReturnType<typeof store.getState>; // Infer RootState type
export type AppDispatch = typeof store.dispatch; // Type for dispatch function



export default store;