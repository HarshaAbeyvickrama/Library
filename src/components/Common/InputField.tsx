import React from 'react';
import {Col} from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";
import {IError} from "../../types/IError";

interface InputFieldProps {
    title: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage?: string
}

const InputField: React.FC<InputFieldProps> = ({title, name, value, onChange, errorMessage}) => {
    return (
        <Col className="input-field my-2 ms-lg-4">
            <span>{title}</span>
            <input
                className="form-control mt-1"
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                style={{
                    borderColor: errorMessage ? '#dc3545' : '',
                }}
            />
            <Feedback
                type="invalid"
                className="feedback-error"
                style={{
                    display: errorMessage ? 'block' : 'none',
                    fontWeight: 500,
                }}
            />
            {errorMessage}
            <Feedback/>
        </Col>

    );
}
export default InputField;
