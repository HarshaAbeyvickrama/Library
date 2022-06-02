import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthor} from "../../types/IAuthor";
import {IBook} from "../../types/IBook";
import {AuthorDetails, LibraryStore} from "../types/types";


const initialState: LibraryStore = {
    authors: [],
    books: [],
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setAuthors: (state, action: PayloadAction<IAuthor[]>) => {
            state.authors = action.payload;
        },
        deleteAuthor: (state, action: PayloadAction<number>) => {
            state.authors = state.authors.filter((author: IAuthor, index: number) => index !== action.payload);
        },
        updateAuthor: (state, action: PayloadAction<AuthorDetails>) => {
            const newAuthorList = [...state.authors];
            newAuthorList.splice(action.payload.index, 1, action.payload.author);
            state.authors = newAuthorList;
        },
        setBooks: (state, action: PayloadAction<IBook[]>) => {
            state.books = action.payload;
        },
        deleteBook: (state, action: PayloadAction<IBook>) => {

        },
        updateBook: (state, action: PayloadAction<IBook>) => {

        },

    }
});

export const {setAuthors, setBooks, deleteAuthor, updateAuthor} = librarySlice.actions;
export default librarySlice.reducer;
