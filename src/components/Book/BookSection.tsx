import React, {useState} from "react";
import SectionTitle from "../Common/SectionTitle";
import Divider from "../Common/Divider";
import EmptyList from "../Common/EmptyList";
import List from "../Common/List";
import AddItem from "../Common/AddItem";
import BookForm from "./BookForm";
import {IBook} from "../../types/IBook";
import DeleteConfirmation from "../Alerts/DeleteConfirmation";
import SuccessTimeoutAlert from "../Alerts/SuccessTimeoutAlert";
import {IAuthor} from "../../types/IAuthor";

interface bookSectionProps {
    books: IBook[],
    onSetBooks: (newBooks: IBook[]) => void,
    authors: IAuthor[]
}

const BookSection: React.FC<bookSectionProps> = ({books, onSetBooks, authors}) => {
    //show form state
    const [showBookForm, setShowBookForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [currentBookTobeDeleted, setCurrentBookToBeDeleted] = useState<IBook | null>(null);
    const [currentBookIndexTobeDeleted, setCurrentBookIndexToBeDeleted] = useState<number>(-1);
    const [currentEditedBookIndex , setCurrentEditedBookIndex ] = useState<number>(-1);
    const [currentBookEdited , setCurrentBookEdited] = useState<IBook | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    //Book form close handler
    const handleFormClose = () => {
        setShowBookForm(!showBookForm);
    }
    //Add Book click handler
    const handleOnAddBookClick = () => {
        setShowBookForm(true);
    }
    //Create Book handler
    const handleOnSubmit = (newBook: IBook) => {
        if(isEditing){
            const newBookList = books;
            newBookList.splice(currentEditedBookIndex, 1, newBook);
            onSetBooks(newBookList);
            setIsEditing(false);
            return;
        }
        const newBooks = [...books, newBook];
        onSetBooks(newBooks);
        setSuccessMessage("Book Created Successfully!");
        setShowSuccessAlert(true);
    }
    //Delete book handler
    const handleOnDeleteBook = (id: number) => {
        const newBooks = books.filter((book: IBook, index: number) => index !== id)
        onSetBooks(newBooks);
    }
    //Edit Book handler
    const handleOnEditBookClicked = (id: number) => {
        const editedBook = books.find((book, index) => {
            return index === id;
        })
        if (editedBook === undefined) {
            return;
        }
        setCurrentEditedBookIndex(id);
        setIsEditing(true);
        setCurrentBookEdited(editedBook);
        setShowBookForm(true);
    }
    const onItemDeleted = () => {
        setShowDeleteConfirmation(false);
        handleOnDeleteBook(currentBookIndexTobeDeleted);
        setShowSuccessAlert(true);
    }
    const onBookDeleteClicked = (bookIndexToBeDeleted: number) => {
        books.forEach((book: IBook, index) => {
            if (index === bookIndexToBeDeleted) {
                setCurrentBookToBeDeleted(book);
                setCurrentBookIndexToBeDeleted(bookIndexToBeDeleted);
            }
        })
        setShowDeleteConfirmation(true);
    }
    //options for react select
    const options = books.filter((book, index) => (
        {value: index, label: book.title}
    ));

    return (
        <React.Fragment>
            <SectionTitle title={"Books"}/>
            <Divider/>
            {books.length === 0
                ? <EmptyList sectionTitle={"Book"}/>
                : <List items={books}
                        onDeleteIconClicked={onBookDeleteClicked}
                        onEditIconClicked={handleOnEditBookClicked}
                />
            }
            <AddItem
                title={"Book"}
                onAddItemClick={handleOnAddBookClick}
            />
            {showBookForm &&
                <BookForm
                    onSubmit={handleOnSubmit}
                    onFormClose={handleFormClose}
                    options={options}
                    authors={authors}
                    isEditing={isEditing}
                    currentBookEdited={currentBookEdited}
                    currentEditedBookIndex={currentEditedBookIndex}
                />}
            <DeleteConfirmation
                onDelete={onItemDeleted}
                show={showDeleteConfirmation}
                setShow={setShowDeleteConfirmation}
                title={"Delete Book " + currentBookTobeDeleted?.title + "?"}
                confirmBtnText={"Delete Book"}
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

export default BookSection;
