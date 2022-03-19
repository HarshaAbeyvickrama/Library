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

const BookSection: React.FC<bookSectionProps> = ({books, onSetBooks,authors}) => {
    //show form state
    const [showBookForm, setShowBookForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [currentBookTobeDeleted, setCurrentBookToBeDeleted] = useState<IBook | null>(null);

    //Book form close handler
    const handleFormClose = () => {
        setShowBookForm(!showBookForm);
    }
    //Add Book click handler
    const handleOnAddBookClick = () => {
        setShowBookForm(true);
    }
    //Create Book handler
    const handleOnSubmit =(newBook: IBook) => {
        // console.log(newBook)
        const newBooks = [...books,newBook];
        onSetBooks(newBooks);
    }
    const onItemDeleted = () => {
        setShowDeleteConfirmation(false);
        setShowSuccessAlert(true);
    }
    const onBookDeleteClicked = (bookIndexToBeDeleted: number) => {
        books.forEach((book: IBook, index) => {
            if (index === bookIndexToBeDeleted) {
                setCurrentBookToBeDeleted(book);
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
            {!books
                ? <EmptyList sectionTitle={"Book"}/>
                : <List items={books} onDeleteIconClicked={onBookDeleteClicked} onEditIconClicked={() => {
                }}/>
            }
            <AddItem title={"Book"} onAddItemClick={handleOnAddBookClick}/>
            {showBookForm &&
                <BookForm
                    onSubmit={handleOnSubmit}
                    onFormClose={handleFormClose}
                    options={options}
                    authors={authors}
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
                message={"Book"}
                title={"Book Deleted Successfully!"}
                timeout={1500}
            />

        </React.Fragment>
    );
}

export default BookSection;
