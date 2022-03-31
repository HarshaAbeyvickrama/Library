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
        setAuthorErrors(validate(currentAuthorName));

    }
    useEffect(() => {
        if (!authorErrors && isSubmit) {
            onSubmit({authorName: currentAuthorName});
            handleClearFields();
        }
    }, [isSubmit, authorErrors])

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
        setIsSubmit(true);
        let error: IError | null = {authorError: ''};
        if (value === '') {
            error.authorError = "Author name is required";
            setIsSubmit(false);
        } else if (authors.some(author => author.authorName === value)) {
            error.authorError = 'Author already exists';
            setIsSubmit(false);
        } else {
            error = null;
        }
        return error;
    }

    //setting current author to be edited on input field

    useEffect(() => {
        if (currentAuthorEdited) {
            setCurrentAuthorName(currentAuthorEdited.authorName);
        }
    }, [currentAuthorEdited])

    const handleOnAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAuthorName(e.target.value)
        // setAuthorErrors(null);
    }
    return (
        <Row className="px-0 mt-4 mb-2 mx-0">
            <Form className="ps-0" onSubmit={handleOnAuthorFormSubmit} noValidate validated={isValidated}>
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
