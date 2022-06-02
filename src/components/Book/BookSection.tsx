import React, {FC, useState} from "react";
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
import {useAppDispatch, useAppSelector} from "../../store/common/hooks";
import {deleteBook, setBooks, updateBook} from "../../store/reducers/librarySlice";
import {BookDetails} from "../../store/types/types";

interface bookSectionProps {
    books: IBook[],
    onSetBooks: (newBooks: IBook[]) => void,
    authors: IAuthor[]
}

const BookSection: FC<bookSectionProps> = ({onSetBooks,}) => {

    const [showBookForm, setShowBookForm] = useState<boolean>(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [currentBookTobeDeleted, setCurrentBookToBeDeleted] = useState<IBook | null>(null);
    const [currentBookIndexTobeDeleted, setCurrentBookIndexToBeDeleted] = useState<number>(-1);
    const [currentEditedBookIndex, setCurrentEditedBookIndex] = useState<number>(-1);
    const [currentBookEdited, setCurrentBookEdited] = useState<IBook | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    //redux
    const dispatch = useAppDispatch();
    const authors = useAppSelector(state => state.library.authors);
    const books = useAppSelector(state => state.library.books);

    //Book form close handler
    const handleFormClose = () => {
        setIsEditing(false);
        setShowBookForm(!showBookForm);
        setCurrentBookEdited(null);
    }

    //Add Book button click handler
    const handleOnAddBookClick = () => {
        setShowBookForm(true);
    }

    //Create Book handler
    const handleOnSubmit = (newBook: IBook) => {
        if (isEditing) {
            const bookDetails: BookDetails = {
                book: newBook,
                index: currentEditedBookIndex
            };
            dispatch(updateBook(bookDetails));
            setIsEditing(false);
            setSuccessMessage("Book Updated Successfully!");
            setShowSuccessAlert(true);
            return;
        }
        const newBooks = [...books, newBook];
        dispatch(setBooks(newBooks));
        setSuccessMessage("Book Created Successfully!");
        setShowSuccessAlert(true);
    }

    //On Delete book icon clicked handler
    const onBookDeleteClicked = (bookIndexToBeDeleted: number) => {
        books.forEach((book: IBook, index) => {
            if (index === bookIndexToBeDeleted) {
                setCurrentBookToBeDeleted(book);
                setCurrentBookIndexToBeDeleted(bookIndexToBeDeleted);
            }
        })
        setShowDeleteConfirmation(true);
    }

    //On Book deleted confirmed Handler
    const onBookDeleteConfirmed = () => {
        setShowDeleteConfirmation(false);
        dispatch(deleteBook(currentBookIndexTobeDeleted));
        setSuccessMessage("Book Deleted Successfully!");
        setShowSuccessAlert(true);
    }

    //Edit Book icon clicked handler
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
                    isEditing={isEditing}
                    currentBookEdited={currentBookEdited}
                    currentEditedBookIndex={currentEditedBookIndex}
                    books={books}
                    authors={authors}/>}

            <DeleteConfirmation
                onDelete={onBookDeleteConfirmed}
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
