import React, {useEffect, useState} from "react";
import SectionTitle from "../Common/SectionTitle";
import Divider from "../Common/Divider";
import {IAuthor} from "../../types/IAuthor";
import EmptyList from "../Common/EmptyList";
import List from "../Common/List";
import AddItem from "../Common/AddItem";
import AuthorForm from "./AuthorForm";
import SuccessTimeoutAlert from "../Alerts/SuccessTimeoutAlert";
import {IBook} from "../../types/IBook";
import DeleteConfirmation from "../Alerts/DeleteConfirmation";

interface AuthorSectionProps {
    authors: IAuthor[],
    onSetAuthors: (newAuthors: IAuthor[]) => void,
}

const AuthorSection: React.FC<AuthorSectionProps> = ({authors, onSetAuthors}) => {
    //Show from state
    const [showAuthorForm, setShowAuthorForm] = useState<boolean>(false);
    const [currentAuthorEdited, setCurrentAuthorEdited] = useState<IAuthor | null>({authorName: ''});
    const [currentEditedAuthorIndex, setCurrentEditedAuthorIndex] = useState<number>(-1);
    const [currentAuthorTobeDeleted, setCurrentAuthorToBeDeleted] = useState<IAuthor | null>(null);
    const [currentAuthorIndexTobeDeleted, setCurrentAuthorIndexToBeDeleted] = useState<number>(-1);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    //Add author button click handler
    const handleAddAuthorClick = () => {
        setShowAuthorForm(!showAuthorForm);
    }

    //Form close handler
    const handleFormClose = () => {
        setIsEditing(false);
        setShowAuthorForm(!showAuthorForm);
        setCurrentAuthorEdited(null);
    }
    //create author handler
    const handleOnSubmit = (newAuthor: IAuthor) => {
        if (isEditing) {
            const newAuthorList = authors;
            newAuthorList.splice(currentEditedAuthorIndex, 1, newAuthor);
            onSetAuthors(newAuthorList);
            setIsEditing(false);
            setSuccessMessage("Author Updated Successfully!");
            setShowSuccessAlert(true);
            return;
        }
        const newAuthors = [...authors, newAuthor];
        onSetAuthors(newAuthors);
        setSuccessMessage("Author Created Successfully!");
        setShowSuccessAlert(true);
    }
    //Delete author handler
    const onAuthorDeleteClicked = (authorIndexToBeDeleted: number) => {
        authors.forEach((author: IAuthor, index) => {
            if (index === authorIndexToBeDeleted) {
                setCurrentAuthorToBeDeleted(author);
                setCurrentAuthorIndexToBeDeleted(authorIndexToBeDeleted);
            }
        })
        setShowDeleteConfirmation(true);
    }
    const handleOnDeleteAuthor = (id: number) => {
        const newAuthors = authors.filter((author: IAuthor, index: number) => index !== id)
        onSetAuthors(newAuthors);
        setSuccessMessage("Author Deleted Successfully!");
        setShowSuccessAlert(true);
    }
    const onAuthorDeleted = () => {
        setShowDeleteConfirmation(false);
        handleOnDeleteAuthor(currentAuthorIndexTobeDeleted);
        setShowSuccessAlert(true);
        setSuccessMessage("Author Deleted Successfully!");
    }
    //Edit author handler
    const handleOnEditAuthorClicked = (id: number) => {
        const editedAuthor = authors.find((author, index) => {
            return index === id;
        })
        if (editedAuthor === undefined) {
            return;
        }
        setCurrentEditedAuthorIndex(id);
        setIsEditing(true);
        setShowAuthorForm(true);
        setCurrentAuthorEdited(editedAuthor);
    }

    useEffect(() => {
        if (currentAuthorEdited?.authorName === '') {
            return;
        }
        setShowAuthorForm(true);
    }, [currentAuthorEdited])

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
                onDelete={onAuthorDeleted}
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
