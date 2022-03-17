import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import FormTitle from "../Common/FormTitle";
import InputField from "../Common/InputField";
import CreateButton from "../Common/CreateButton";
import {IAuthor} from "../../types/IAuthor";

interface AuthorFormProps {
    onFormClose: () => void,
    handleOnSubmit: (e: React.FormEvent) => void,
    isEditing: boolean,
    currentAuthorEdited: IAuthor | null
}

const AuthorForm: React.FC<AuthorFormProps> = ({onFormClose, handleOnSubmit, isEditing, currentAuthorEdited}) => {
    const [currentAuthorName, setCurrentAuthorName] = useState<string>('');
    const handleOnAuthorFormSubmit = (e: React.FormEvent) => {
        handleOnSubmit(e);
        setCurrentAuthorName('');
    }
    //setting current author to be edited on input field

    useEffect(() => {
        if (currentAuthorEdited) {
            setCurrentAuthorName(currentAuthorEdited.authorName);
        }
    }, [currentAuthorEdited])

    const handleOnAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAuthorName(e.target.value)
    }
    return (
        <Row className="px-0 mt-4 mb-2 mx-0">
            <Form className="ps-0" onSubmit={handleOnAuthorFormSubmit}>
                <Col xs={12} lg={9} className="px-0">
                    <FormTitle name={isEditing ? "Edit Author" : "Create Author"} onFormClose={onFormClose}/>
                    <InputField title={"Name of Author"} name={"authorName"} value={currentAuthorName}
                                onChange={handleOnAuthorNameChange}/>
                    <CreateButton title={isEditing ? "Update" : "Create"}/>
                </Col>
            </Form>
        </Row>
    );
}

export default AuthorForm;
