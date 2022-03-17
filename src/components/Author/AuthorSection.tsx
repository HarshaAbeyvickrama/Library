import React, {useState} from "react";
import SectionTitle from "../Common/SectionTitle";
import Divider from "../Common/Divider";
import {IAuthor} from "../../types/IAuthor";
import EmptyList from "../Common/EmptyList";
import List from "../Common/List";
import CreateButton from "../Common/CreateButton";
import AddItem from "../Common/AddItem";
import AuthorForm from "./AuthorForm";

interface AuthorSectionProps {
    authors: IAuthor[],
    onSetAuthors: (newAuthors: IAuthor[]) => void
}

const AuthorSection: React.FC<AuthorSectionProps> = ({authors, onSetAuthors}) => {
    //Add author button click handle function
    const handleAddAuthorClick = () => {
        setShowForm(!showForm);
    }
    const [showForm, setShowForm] = useState<boolean>(false);
    //Form close handler
    const handleFormClose = ()=>{
        setShowForm(!showForm);
    }
    return (
        <React.Fragment>
            <SectionTitle title={"Authors"}/>
            <Divider/>
            {authors.length === 0
                ? <EmptyList sectionTitle={"Author"}/>
                : <List items={authors} onDeleteIconClicked={() => {
                }} onEditIconClicked={() => {
                }}
                />
            }
            <AddItem title={"Author"} onAddItemClick={handleAddAuthorClick}/>
            {showForm &&
                <AuthorForm onFormClose={handleFormClose} handleOnSubmit={()=>{}} isEditing={false} currentAuthorEdited={null} />
            }


        </React.Fragment>
    );
}

export default AuthorSection;
