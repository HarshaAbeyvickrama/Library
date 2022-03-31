import React from 'react';
import {Col} from "react-bootstrap";

interface InputFieldProps {
    title: string,
    name: string,
    value: string,
    onChange: (e: any) => void,
    errorMessage?: string
}

const InputField: React.FC<InputFieldProps> = ({title, name, value, onChange, errorMessage}) => {
    return (
        <Col className="input-field mt-0 mb-2 ms-lg-4">
            <span>{title}</span>
            <input
                className="form-control mt-1"
                type="text"
                name={name}
                value={value}
                onChange={onChange}
            />
        </Col>

    );
}
export default InputField;
