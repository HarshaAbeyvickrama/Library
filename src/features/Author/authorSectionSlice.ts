import {createSlice} from "@reduxjs/toolkit";
import {IAuthor} from "../../types/IAuthor";

type initialStateType = {
    showAuthorForm: boolean,
    currentAuthorEdited: IAuthor | null,
    currentEditedAuthorIndex: number,
    currentAuthorTobeDeleted: IAuthor | null,
    currentAuthorIndexTobeDeleted: number,
    isEditing: boolean,
}

const initialState: initialStateType = {
    showAuthorForm: false,
    currentAuthorEdited: null,
    currentEditedAuthorIndex: -1,
    currentAuthorTobeDeleted: null,
    currentAuthorIndexTobeDeleted: -1,
    isEditing: false,
}

const authorSectionSlice = createSlice({
    name: 'authorSection',
    initialState,
    reducers: {
        showAuthorForm: state => {
            state.showAuthorForm = true;
        },
        hideAuthorForm: state => {
            state.showAuthorForm = false;
        },

    }
})

export const {showAuthorForm, hideAuthorForm} = authorSectionSlice.actions;
export default authorSectionSlice.reducer;















































