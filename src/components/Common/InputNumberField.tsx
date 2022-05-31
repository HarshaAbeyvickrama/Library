import React from 'react';
import {Col} from "react-bootstrap";
import NumberFormat from 'react-number-format';

interface InputNumberFieldProps {
    title: string,
    name: string,
    value: string,
    onChange: (values: any, sourceInfo: any) => void,
    errorMessage?: string
}

const InputNumberField: React.FC<InputNumberFieldProps> = ({title, name, value, onChange, errorMessage}) => {
    return (
        <Col className="input-field mt-0 mb-2 ms-lg-4">
            <span>{title}</span>
            <NumberFormat
                width='100%'
                thousandSeparator={true}
                onValueChange={onChange}
                className="w-100"
                value={value}
                style={errorMessage ? {borderColor: 'red'} : {borderColor: '#969696'}}
            />
            {errorMessage && <span className="text-danger">{errorMessage}</span>}

        </Col>

    );
}
export default InputNumberField;
