import React, {useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import FormTitle from "../Common/FormTitle";
import InputField from "../Common/InputField";
import CreateButton from "../Common/CreateButton";
import {IBook} from "../../types/IBook";
import SelectDropdown from "../Common/SelectDropdown";
import {IError} from "../../types/IError";

interface BookFormProps {
    onFormClose: () => void,
    options: IBook[]
}

const BookForm: React.FC<BookFormProps> = ({onFormClose, options}) => {
    const [currentBookTitle , setCurrentBookTitle] = useState<string>('');
    const [currentBookISBN , setCurrentBookISBN] = useState<string>('');
    const [bookErrors , setBookErrors ] = useState<IError>({bookTitleError:'asdasd',ISBNError:'asdasda'});
    return (
        <Row className="px-0 my-4 my-md-4 mx-0">
            <Form className="ps-0">
                <Col xs={12} lg={9} md={10} className="px-0">
                    <FormTitle name={"Book"} onFormClose={onFormClose}/>
                    <InputField
                        title={"Title of the Book"}
                        name={"bookTitle"}
                        value={currentBookTitle}
                        onChange={() =>{}}
                        errorMessage={bookErrors.bookTitleError}
                    />
                    <InputField
                        title={"ISBN"}
                        name={"ISBN"}
                        value={currentBookISBN}
                        onChange={() =>{}}
                        errorMessage={bookErrors.ISBNError}
                    />
                    <SelectDropdown />
                    {/*<CreateButton title={"Create"}/>*/}
                </Col>
            </Form>
        </Row>
    );
}

export default BookForm;
