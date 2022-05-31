import React, {useState} from "react";
import SectionTitle from "../Common/SectionTitle";
import Divider from "../Common/Divider";
import {IAuthor} from "../../types/IAuthor";
import EmptyList from "../Common/EmptyList";
import List from "../Common/List";
import AddItem from "../Common/AddItem";
import AuthorForm from "./AuthorForm";
import SuccessTimeoutAlert from "../Alerts/SuccessTimeoutAlert";
import DeleteConfirmation from "../Alerts/DeleteConfirmation";
import {useAppDispatch, useAppSelector} from "../../store/common/hooks";
import {setAuthors} from "../../views/librarySlice";

interface AuthorSectionProps {
    authors: IAuthor[],
    onSetAuthors: (newAuthors: IAuthor[]) => void,
}

const AuthorSection: React.FC<AuthorSectionProps> = ({onSetAuthors}) => {

    const [showAuthorForm, setShowAuthorForm] = useState<boolean>(false);
    const [currentAuthorEdited, setCurrentAuthorEdited] = useState<IAuthor | null>({authorName: ''});
    const [currentEditedAuthorIndex, setCurrentEditedAuthorIndex] = useState<number>(-1);
    const [currentAuthorTobeDeleted, setCurrentAuthorToBeDeleted] = useState<IAuthor | null>(null);
    const [currentAuthorIndexTobeDeleted, setCurrentAuthorIndexToBeDeleted] = useState<number>(-1);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    //Redux
    const dispatch = useAppDispatch();
    const authors = useAppSelector(state => state.library.authors);

    //Form close handler
    const handleFormClose = () => {
        setIsEditing(false);
        setShowAuthorForm(false);
        setCurrentAuthorEdited(null);
        setCurrentEditedAuthorIndex(-1);
    }

    //Add author button click handler
    const handleAddAuthorClick = () => {
        setShowAuthorForm(!showAuthorForm);
    }

    //create author handler
    const handleOnSubmit = (newAuthor: IAuthor) => {
        if (isEditing) {
            const newAuthorList = [...authors];
            newAuthorList.splice(currentEditedAuthorIndex, 1, newAuthor);
            dispatch(setAuthors(newAuthorList));
            setIsEditing(false);
            setSuccessMessage("Author Updated Successfully!");
            setShowSuccessAlert(true);
            setShowAuthorForm(false);
            return;
        }
        const newAuthors = [...authors, newAuthor];
        dispatch(setAuthors(newAuthors));
        setSuccessMessage("Author Created Successfully!");
        setShowSuccessAlert(true);
    }

    //On Delete author icon clicked handler
    const onAuthorDeleteClicked = (authorIndexToBeDeleted: number) => {
        authors.forEach((author: IAuthor, index) => {
            if (index === authorIndexToBeDeleted) {
                setCurrentAuthorToBeDeleted(author);
                setCurrentAuthorIndexToBeDeleted(authorIndexToBeDeleted);
            }
        })
        setShowDeleteConfirmation(true);
    }

    //On Book deleted confirmed Handler
    const onAuthorDeleteConfirmed = () => {
        setShowDeleteConfirmation(false);
        deleteAuthor(currentAuthorIndexTobeDeleted);
    }

    //Delete author handler
    const deleteAuthor = (id: number) => {
        const newAuthors = authors.filter((author: IAuthor, index: number) => index !== id)
        dispatch(setAuthors(newAuthors));
        setSuccessMessage("Author Deleted Successfully!");
        setShowSuccessAlert(true);
    }

    //Edit author icon clicked handler
    const handleOnEditAuthorClicked = (id: number) => {
        const editedAuthor = authors.find((author, index) => {
            return index === id;
        })
        if (editedAuthor === undefined) {
            return;
        }
        setCurrentEditedAuthorIndex(id);
        setIsEditing(true);
        setCurrentAuthorEdited(editedAuthor);
        setShowAuthorForm(true);
    }

    return (
        <React.Fragment>
            <SectionTitle title={"Authors"}/>
            <Divider/>
            {authors.length === 0
                ? <EmptyList sectionTitle={"Author"}/>
                : <List items={authors}
                        onDeleteIconClicked={onAuthorDeleteClicked}
                        onEditIconClicked={handleOnEditAuthorClicked}/>
            }
            <AddItem title={"Author"} onAddItemClick={handleAddAuthorClick}/>
            {showAuthorForm &&
                <AuthorForm
                    onFormClose={handleFormClose}
                    onSubmit={handleOnSubmit}
                    isEditing={isEditing}
                    currentAuthorEdited={currentAuthorEdited}
                    authors={authors}
                />
            }
            <DeleteConfirmation
                onDelete={onAuthorDeleteConfirmed}
                show={showDeleteConfirmation}
                setShow={setShowDeleteConfirmation}
                title={
                    "Delete Author " + currentAuthorTobeDeleted?.authorName + "?"
                }

                confirmBtnText={"Delete Author"}
            />
            <SuccessTimeoutAlert
                show={showSuccessAlert}
                setShow={setShowSuccessAlert}
                title={successMessage}
                timeout={1000}
            />
        </React.Fragment>
    );
}

export default AuthorSection;
