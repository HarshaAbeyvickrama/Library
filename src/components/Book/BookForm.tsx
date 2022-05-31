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
import InputNumberField from "../Common/InputNumberField";
// import {useDispatch} from "react-redux";
// import {setBookFormVisibility} from "../../features/Book/bookSectionSlice";
// import {useAppSelector} from "../../common/hooks";

interface BookFormProps {
    onFormClose: () => void,
    onSubmit: (newBook: IBook) => void,
    authors: IAuthor[],
    isEditing: boolean,
    currentBookEdited: IBook | null,
    currentEditedBookIndex: number,
    books: IBook[],
}

const BookForm: React.FC<BookFormProps> = ({
                                               onFormClose,
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
    // const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (currentBookEdited === null) {
            handleClearFields();
        } else {
            setCurrentBookTitle(currentBookEdited.title);
            setCurrentBookISBN(currentBookEdited.ISBN);
            setCurrentBookAuthor({
                value: currentEditedBookIndex,
                label: currentBookEdited.author.authorName
            })
        }
    }, [currentBookEdited])

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

    //Book from submit handler
    const handleOnBookFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBook: IBook = {
            title: currentBookTitle,
            ISBN: currentBookISBN,
            author: currentBookAuthor ? {authorName: currentBookAuthor.label} : {authorName: ''}
        };

        if (validate(newBook)) {
            onSubmit(newBook);
            setBookErrors(null);
            handleClearFields();
        }
    }

    //Validation
    const validate = (book: IBook) => {
        // setIsSubmit(true);
        let error: IError | null = null;
        if (book.title === '') {
            error = {};
            error.bookTitleError = "Book title is required";
        }
        if (book.ISBN === '') {
            error ? error = {...error} : error = {};
            error.ISBNError = "ISBN is required";
        }
        if (book.author.authorName === '') {
            error ? error = {...error} : error = {};
            error.authorError = "Please select an author"
        }
        if (books.some(b => {
            return b.title === book.title && b.ISBN === book.ISBN && b.author.authorName === book.author.authorName
        })) {
            error ? error = {...error} : error = {};
            error.bookTitleError = 'Book already exists';
            error.ISBNError = 'Book already exists';
            error.authorError = 'Book already exists';
        }

        if (error) {
            setBookErrors(error);
            return false;
        } else {
            return true;
        }
    }

    //Clear fields
    const handleClearFields = () => {
        setCurrentBookTitle('');
        setCurrentBookISBN('');
        setCurrentBookAuthor(null);
    }

    const handleFormClose = () => {
        onFormClose();
        // dispatch(setBookFormVisibility(false));
    }
    //Field value change handlers

    const handleOnBookTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBookTitle(e.target.value);
    }

    const handleOnBookISBNChange = (values: any, sourceInfo: any) => {
        setCurrentBookISBN(values.value);
    }

    const handleOnBookAuthorChange = (e: IAuthorOption) => {
        setCurrentBookAuthor({...e})
    }

    return (
        <Row className="px-0 my-4 my-md-4 mx-0">
            <Form className="ps-0" onSubmit={handleOnBookFormSubmit}>
                <Col lg={12} xl={9} className="px-0">
                    <FormTitle name={isEditing ? "Edit Book" : "Create Book"} onFormClose={handleFormClose}/>
                    <InputField
                        title={"Title of the Book"}
                        name={"bookTitle"}
                        value={currentBookTitle}
                        onChange={handleOnBookTitleChange}
                        errorMessage={bookErrors?.bookTitleError}
                    />

                    <InputNumberField
                        title='ISBN'
                        name='ISBN' value={currentBookISBN}
                        onChange={handleOnBookISBNChange}
                        errorMessage={bookErrors?.ISBNError}
                    />
                    <SelectDropdown
                        title="Author"
                        options={authorOptions}
                        onChange={handleOnBookAuthorChange}
                        currentSelectedAuthor={currentBookAuthor}
                        errorMessage={bookErrors?.authorError}
                    />
                    <CreateButton title={isEditing ? "Update" : "Create"}/>
                </Col>
            </Form>
        </Row>
    );
}

export default BookForm;
