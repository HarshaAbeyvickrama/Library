import React, {useState} from "react";
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
    onDeleteAuthor: (index: number) => void
}

const AuthorSection: React.FC<AuthorSectionProps> = ({authors, onSetAuthors,onDeleteAuthor}) => {
    //Show from state
    const [showForm, setShowForm] = useState<boolean>(false);

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
        const newAuthors = [...authors, newAuthor];
        onSetAuthors(newAuthors);
    }

    return (
        <React.Fragment>
            <SectionTitle title={"Authors"}/>
            <Divider/>
            {authors.length === 0
                ? <EmptyList sectionTitle={"Author"}/>
                : <List items={authors}
                        onDeleteIconClicked={onDeleteAuthor}
                        onEditIconClicked={() => {} } />
            }
            <AddItem title={"Author"} onAddItemClick={handleAddAuthorClick}/>
            {showForm &&
                <AuthorForm
                    onFormClose={handleFormClose}
                    onSubmit={handleOnSubmit}
                    isEditing={false}
                    currentAuthorEdited={null}
                    authors={authors}
                />
            }
        </React.Fragment>
    );
}

export default AuthorSection;
