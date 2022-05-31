import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBook} from "../../types/IBook";

type initialStateType = {
    books: IBook[],
    showBookForm: boolean,
    showDeleteConfirmation: boolean,
    showSuccessAlert: boolean,
    currentBookTobeDeleted: IBook | null,
    currentBookIndexTobeDeleted: number,
    currentEditedBookIndex: number,
    currentBookEdited: IBook | null,
    isEditing: boolean,
    successMessage: string,
}

const initialState: initialStateType = {
    books: [],
    showBookForm: false,
    showDeleteConfirmation: false,
    showSuccessAlert: false,
    currentBookTobeDeleted: null,
    currentBookIndexTobeDeleted: -1,
    currentEditedBookIndex: -1,
    currentBookEdited: null,
    isEditing: false,
    successMessage: ''
}

const bookSectionSlice = createSlice({
    name: 'bookSection',
    initialState,
    reducers: {
        setBookFormVisibility: (state, action: PayloadAction<boolean>) => {
            state.showBookForm = action.payload;
        }

    }
})

export const {setBookFormVisibility} = bookSectionSlice.actions;
export default bookSectionSlice.reducer;
