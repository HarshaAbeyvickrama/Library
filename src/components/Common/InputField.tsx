import React from 'react';
import {Col} from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";

interface InputFieldProps {
    title: string,
    name: string,
    value: string,
    onChange: (e: any) => void,
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
            <span className="error-message fw-500">{errorMessage}</span>
        </Col>

    );
}
export default InputField;
