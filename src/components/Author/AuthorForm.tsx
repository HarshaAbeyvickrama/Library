import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import FormTitle from "../Common/FormTitle";
import InputField from "../Common/InputField";
import CreateButton from "../Common/CreateButton";
import {IAuthor} from "../../types/IAuthor";
import {IError} from "../../types/IError";

interface AuthorFormProps {
    onFormClose: () => void,
    onSubmit: (newAuthor: IAuthor) => void,
    isEditing: boolean,
    currentAuthorEdited: IAuthor | null,
    authors: IAuthor[]
}

const AuthorForm: React.FC<AuthorFormProps> = ({onFormClose, onSubmit, isEditing, currentAuthorEdited, authors}) => {
    const [currentAuthorName, setCurrentAuthorName] = useState<string>('');
    const [authorErrors, setAuthorErrors] = useState<IError | null>(null)
    const [isSubmit, setIsSubmit] = useState(false);
    const [isValidated, setIsValidated] = useState(false);


    useEffect(() => {
        if (currentAuthorEdited === null) {
            handleClearFields();
        }
    }, [currentAuthorEdited])

    const handleOnAuthorFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAuthor: IAuthor = {
            authorName: currentAuthorName
        }
        if (validate(currentAuthorName)) {
            onSubmit(newAuthor);
            setAuthorErrors(null);
            handleClearFields();
        }

    }

    //Clear fields
    const handleClearFields = () => {
        setCurrentAuthorName('');
    }

    //handle form close
    const handleFormClose = () => {
        onFormClose();
    }

    // validate author
    const validate = (value: string) => {
        let error: IError | null = null;
        if (value === '') {
            error = {};
            error.authorError = "Author name is required";
        }
        if (authors.some(author => author.authorName === value)) {
            error ? error = {...error} : error = {};
            error.authorError = 'Author already exists';
        }
        if (error) {
            setAuthorErrors(error);
            return false;
        } else {
            return true;
        }
    }

    const handleOnAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAuthorName(e.target.value)
    }

    return (
        <Row className="px-0 mt-4 mb-2 mx-0">
            <Form className="ps-0" onSubmit={handleOnAuthorFormSubmit}>
                <Col lg={12} xl={9} className="px-0">
                    <FormTitle name={isEditing ? "Edit Author" : "Create Author"} onFormClose={handleFormClose}/>
                    <InputField
                        title={"Name of Author"}
                        name={"authorName"}
                        value={currentAuthorName}
                        onChange={handleOnAuthorNameChange}
                        errorMessage={authorErrors?.authorError}
                    />
                    <CreateButton title={isEditing ? "Update" : "Create"}/>
                </Col>
            </Form>
        </Row>
    );
}

export default AuthorForm;
