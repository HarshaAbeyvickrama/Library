import {configureStore} from "@reduxjs/toolkit";
import bookSectionReducer from './features/Book/bookSectionSlice';
import authorSectionReducer from "./features/Author/authorSectionSlice";
import libraryReducer from './views/librarySlice';


const store = configureStore({
    reducer: {
        library: libraryReducer,
        authorSection: authorSectionReducer,
        bookSection: bookSectionReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
