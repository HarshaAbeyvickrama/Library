import React from 'react';
import {Col} from "react-bootstrap";

interface InputFieldProps {
    title: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({title, name, value, onChange}) => {
    return (
        <Col className="input-field my-2 ms-lg-4">
            <span>{title}</span>
            <input className="form-control mt-1" type="text" required={true} name={name} value={value}
                   onChange={onChange} />
        </Col>
);
}
export default InputField;
