import React, {useEffect, useState} from "react";
import SectionTitle from "../Common/SectionTitle";
import Divider from "../Common/Divider";
import {IAuthor} from "../../types/IAuthor";
import EmptyList from "../Common/EmptyList";
import List from "../Common/List";
import AddItem from "../Common/AddItem";
import AuthorForm from "./AuthorForm";

interface AuthorSectionProps {
    authors: IAuthor[],
    onSetAuthors: (newAuthors: IAuthor[]) => void,
}

const AuthorSection: React.FC<AuthorSectionProps> = ({authors, onSetAuthors}) => {
    //Show from state
    const [showForm, setShowForm] = useState<boolean>(false);
    const [currentAuthorEdited, setCurrentAuthorEdited] = useState<IAuthor>({authorName: ''});
    const [currentEditedAuthorIndex, setCurrentEditedAuthorIndex] = useState<number>(-1);
    const [isEditing, setIsEditing] = useState(false);

    //Add author button click handler
    const handleAddAuthorClick = () => {
        setShowForm(!showForm);
    }

    //Form close handler
    const handleFormClose = () => {
        setShowForm(!showForm);
    }
    //create author handler
    const handleOnSubmit = (newAuthor: IAuthor) => {
        if (isEditing) {
            const newAuthorList = authors;
            newAuthorList.splice(currentEditedAuthorIndex, 1, newAuthor);
            onSetAuthors(newAuthorList);
            return;
        }
        const newAuthors = [...authors, newAuthor];
        onSetAuthors(newAuthors);
    }
    //Delete author handler
    const handleOnDeleteAuthor = (id: number) => {
        const newAuthors = authors.filter((author: IAuthor, index: number) => index !== id)
        onSetAuthors(newAuthors);
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
        setCurrentAuthorEdited(editedAuthor);
    }
    //Submit edited author handler
    const handleOnAuthorEdited = (editedAuthor: IAuthor) => {
        console.log(editedAuthor);
    }
    useEffect(() => {
        if (currentAuthorEdited.authorName === '') {
            return;
        }
        setShowForm(true);
    }, [currentAuthorEdited])

    return (
        <React.Fragment>
            <SectionTitle title={"Authors"}/>
            <Divider/>
            {authors.length === 0
                ? <EmptyList sectionTitle={"Author"}/>
                : <List items={authors}
                        onDeleteIconClicked={handleOnDeleteAuthor}
                        onEditIconClicked={handleOnEditAuthorClicked}/>
            }
            <AddItem title={"Author"} onAddItemClick={handleAddAuthorClick}/>
            {showForm &&
                <AuthorForm
                    onFormClose={handleFormClose}
                    onSubmit={handleOnSubmit}
                    isEditing={isEditing}
                    currentAuthorEdited={currentAuthorEdited}
                    authors={authors}
                />
            }
        </React.Fragment>
    );
}

export default AuthorSection;
