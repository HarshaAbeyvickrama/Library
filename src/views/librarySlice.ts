import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthor} from "../types/IAuthor";
import {IBook} from "../types/IBook";

type initialStateType = {
    authors: IAuthor[],
    books: IBook[],
    deleteConfirmationVisible: boolean,
    successAlertVisible: boolean,
    successMessage: string,
    deleteMessage: string
}

const initialState: initialStateType = {
    authors: [],
    books: [],
    deleteConfirmationVisible: false,
    successAlertVisible: false,
    successMessage: '',
    deleteMessage: ''
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setAuthors: (state, action: PayloadAction<IAuthor[]>) => {
            state.authors = action.payload;
        },
        setBooks: (state, action: PayloadAction<IBook[]>) => {
            state.books = action.payload;
        },
    }
});

export const {setAuthors, setBooks,} = librarySlice.actions;
export default librarySlice.reducer;
