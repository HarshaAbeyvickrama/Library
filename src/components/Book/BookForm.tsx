import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import FormTitle from "../Common/FormTitle";
import InputField from "../Common/InputField";
import CreateButton from "../Common/CreateButton";
import {IBook} from "../../types/IBook";
import SelectDropdown from "../Common/SelectDropdown";
import {IError} from "../../types/IError";
import {IAuthor} from "../../types/IAuthor";
import {IAuthorOption} from "../../types/IAuthorOption";

interface BookFormProps {
    onFormClose: () => void,
    options: IBook[],
    onSubmit: (newBook: IBook) => void,
    authors: IAuthor[],
    isEditing: boolean,
    currentBookEdited: IBook | null,
    currentEditedBookIndex: number,
    books: IBook[],
}

const BookForm: React.FC<BookFormProps> = ({
                                               onFormClose,
                                               options,
                                               onSubmit,
                                               authors,
                                               isEditing,
                                               currentBookEdited,
                                               currentEditedBookIndex,
                                               books
                                           }) => {
    const [currentBookTitle, setCurrentBookTitle] = useState<string>('');
    const [currentBookISBN, setCurrentBookISBN] = useState<string>('');
    const [currentBookAuthor, setCurrentBookAuthor] = useState<IAuthorOption | null>(null);
    const [bookErrors, setBookErrors] = useState<IError | null>({bookTitleError: '', ISBNError: ''});
    const [authorOptions, setAuthorOptions] = useState<IAuthorOption[]>([]);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if(currentBookEdited === null){
            handleClearFields();
        }
    },[currentBookEdited])
    //Book from submit handler
    const handleOnBookFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBook: IBook = {
            title: currentBookTitle,
            ISBN: currentBookISBN,
            author: currentBookAuthor ? {authorName: currentBookAuthor.label} : {authorName: ''}
        };
        // setBookErrors(validate(newBook));
        onSubmit(newBook);
    }
    // useEffect(() => {
    //     if(!bookErrors && isSubmit && currentBookAuthor){
    //         onSubmit({
    //             title: currentBookTitle,
    //             ISBN: currentBookISBN,
    //             author: {authorName: currentBookAuthor.label}
    //         });
    //         handleClearFields();
    //     }
    // },[bookErrors])
    //Validation
    const validate = (book: IBook) => {
        setIsSubmit(true);
        let error: IError | null = {};
        if(book.title === ''){
            error.bookTitleError = "Book title is required";
            setIsSubmit(false);
        }else {
            error = null;
        }
        return error;
    }

    //Clear fields
    const handleClearFields = () => {
        setCurrentBookTitle('');
        setCurrentBookISBN('');
        setCurrentBookAuthor(null);
    }
    const handleFormClose = () => {
        onFormClose();
    }
    //Field value change handlers
    const handleOnBookTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBookTitle(e.target.value);
    }
    const handleOnBookISBNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBookISBN(e.target.value);
    }
    const handleOnBookAuthorChange = (e: IAuthorOption) => {
        setCurrentBookAuthor({...e})
    }
    useEffect(() => {
        const newAuthorOptions = authors.map((author, index) => {
            const authorOption: IAuthorOption = {
                value: index,
                label: author.authorName
            }
            return authorOption;
        })
        setAuthorOptions([
            ...newAuthorOptions
        ])
    }, [authors]);

    useEffect(() => {
        if (currentBookEdited) {
            setCurrentBookTitle(currentBookEdited.title);
            setCurrentBookISBN(currentBookEdited.ISBN);
            setCurrentBookAuthor({
                value: currentEditedBookIndex,
                label: currentBookEdited.author.authorName
            })
        }
    }, [currentBookEdited])
    return (
        <Row className="px-0 my-4 my-md-4 mx-0">
            <Form className="ps-0" onSubmit={handleOnBookFormSubmit}>
                <Col xs={12} lg={9} md={10} className="px-0">
                    <FormTitle name={isEditing ? "Edit Book" : "Create Book"} onFormClose={handleFormClose}/>
                    <InputField
                        title={"Title of the Book"}
                        name={"bookTitle"}
                        value={currentBookTitle}
                        onChange={handleOnBookTitleChange}
                        errorMessage={bookErrors?.bookTitleError}
                    />
                    <InputField
                        title={"ISBN"}
                        name={"ISBN"}
                        value={currentBookISBN}
                        onChange={handleOnBookISBNChange}
                        errorMessage={bookErrors?.ISBNError}
                    />
                    <SelectDropdown
                        title="Author"
                        options={authorOptions}
                        onChange={handleOnBookAuthorChange}
                        currentSelectedAuthor={currentBookAuthor}
                    />
                    <CreateButton title={isEditing ? "Update" : "Create"}/>
                </Col>
            </Form>
        </Row>
    );
}

export default BookForm;
