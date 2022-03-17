import React, {useEffect, useState} from "react";
import SectionTitle from "../Common/SectionTitle";
import Divider from "../Common/Divider";
import EmptyList from "../Common/EmptyList";
import List from "../Common/List";
import AddItem from "../Common/AddItem";
import AuthorForm from "./AuthorForm";
import {IAuthor} from "../../types/IAuthor";
import DeleteConfirmation from "../Alerts/DeleteConfirmation";
import SuccessTimeoutAlert from "../Alerts/SuccessTimeoutAlert";

interface AuthorSectionProps {
    authors: IAuthor[] | null,
    handleSetAuthors: (newAuthors: IAuthor[]) => void
}

const AuthorSection: React.FC<AuthorSectionProps> = ({authors, handleSetAuthors}) => {
    const [newAuthor, setNewAuthor] = useState<IAuthor | null>(null);
    const [showAuthorForm, setShowAuthorForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
    const [showAddSuccessAlert, setShowAddSuccessAlert] = useState(false);
    const [currentAuthorToBeDeleted, setCurrentAuthorToBeDeleted] = useState<IAuthor | null>(null);
    const [currentAuthorToBeEdited, setCurrentAuthorToBeEdited] = useState<IAuthor | null>(null);
    const [isEditingAuthor, setIsEditingAuthor] = useState(false);
    const [authorIndexEdited, setAuthorIndexEdited] = useState<number | null>(null);


    const onEditIconClicked = (authorIndexToBeEdited: number) => {
        if (!authors) {
            return;
        }
        authors.forEach((author: IAuthor, index) => {
            if (index === authorIndexToBeEdited) {
                setCurrentAuthorToBeEdited(author);
                setAuthorIndexEdited(authorIndexToBeEdited);
            }
        })
        setShowAuthorForm(true);
        setIsEditingAuthor(true);
    }
    // useEffect(() => {
    //     onItemEdited();
    // }, [authorIndexEdited])
    //
    useEffect(() => {
        if (currentAuthorToBeEdited) {

        }
    }, [currentAuthorToBeEdited]);

    const onItemEdited = () => {

        setIsEditingAuthor(false);
    }
    const onItemDeleted = () => {
        setShowDeleteConfirmation(false);
        setShowDeleteSuccessAlert(true);
    }
    const onAuthorDeleteClicked = (authorIndexToBeDeleted: number) => {
        if (!authors) {
            return;
        }
        authors.forEach((author: IAuthor, index) => {
            if (index === authorIndexToBeDeleted) {
                setCurrentAuthorToBeDeleted(author);
            }
        })
        const allAuthors = authors;
        allAuthors.splice(authorIndexToBeDeleted, 1);
        handleSetAuthors(allAuthors);
        setShowDeleteConfirmation(true);
    }
    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as typeof e.target & {
            authorName: { value: string }
        }
        const authorName = form.authorName.value;
        const author = {authorName: authorName};

        if (isEditingAuthor) {
            if (authors && authorIndexEdited) {
                const allAuthors = authors;
                if (currentAuthorToBeEdited) {
                    allAuthors.splice(authorIndexEdited, 1, currentAuthorToBeEdited);
                    handleSetAuthors(allAuthors);
                }
            }
        } else {
            setNewAuthor(author);
            setShowAddSuccessAlert(true);
        }

    }
    const handleOnClose = () => {
        setIsEditingAuthor(false);
        setShowAuthorForm(false);
    }
    useEffect(() => {
        if (!newAuthor) {
            return;
        }
        if (!authors) {
            handleSetAuthors([newAuthor]);
        } else {
            handleSetAuthors([...authors, newAuthor]);
        }

    }, [newAuthor])
    const handleOnAddItemClick = () => {
        setIsEditingAuthor(false);
        setShowAuthorForm(true);
    }

    return (
        <React.Fragment>
            <SectionTitle title={"Authors"}/>
            <Divider/>
            {!authors
                ? <EmptyList sectionTitle={"Author"}/>
                : <List items={authors} onDeleteIconClicked={onAuthorDeleteClicked}
                        onEditIconClicked={onEditIconClicked}/>
            }
            <AddItem title={"Author"} onAddItemClick={handleOnAddItemClick}/>
            {showAuthorForm &&
                <AuthorForm onFormClose={handleOnClose} handleOnSubmit={handleOnSubmit} isEditing={isEditingAuthor}
                            currentAuthorEdited={currentAuthorToBeEdited}/>}
            <DeleteConfirmation
                onDelete={onItemDeleted}
                show={showDeleteConfirmation}
                setShow={setShowDeleteConfirmation}
                title={"Delete Author " + currentAuthorToBeDeleted?.authorName + " ?"}
                confirmBtnText={"Delete Author"}
            />
            <SuccessTimeoutAlert
                show={showDeleteSuccessAlert}
                setShow={setShowDeleteSuccessAlert}
                message={"Author Deleted Succesfully"}
                title={"Success"}
                timeout={1500}
            />
            <SuccessTimeoutAlert
                show={showAddSuccessAlert}
                setShow={setShowAddSuccessAlert}
                message={""}
                title={"Author Addedd Succesfully!"}
                timeout={1500}
            />

        </React.Fragment>
    );
}

export default AuthorSection;
