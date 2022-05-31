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
        setSuccessMessage: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        setSuccessAlertVisibility: (state, action: PayloadAction<boolean>) => {
            state.successAlertVisible = action.payload;
        },
        setDeleteMessage: (state, action: PayloadAction<string>) => {
            state.deleteMessage = action.payload;
        },
        setDeleteAlertVisibility: (state, action: PayloadAction<boolean>) => {
            state.deleteConfirmationVisible = action.payload;
        }
    }
});

export const {
    setAuthors,
    setBooks,
    setSuccessMessage,
    setSuccessAlertVisibility,
    setDeleteAlertVisibility,
    setDeleteMessage
} =
    librarySlice.actions;
export default librarySlice.reducer;
