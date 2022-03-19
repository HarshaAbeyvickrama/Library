import React, {Component} from "react";
import Select from "react-select";
import {IAuthorOption} from "../../types/IAuthorOption";
import {Col} from "react-bootstrap";

interface SelectDropdownProps {
    options: IAuthorOption[],
    onChange: (e: any) => void,
    currentSelectedAuthor: IAuthorOption | null,
    title: string
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({title, options, onChange, currentSelectedAuthor}) => {

    return (
        <Col className="input-field my-2 ms-lg-4">
            <span>{title}</span>
            <Select
                isClearable={true}
                className="select-dropdown"
                value={currentSelectedAuthor}
                options={options}
                onChange={onChange}
            />
        </Col>

    );
}

export default SelectDropdown;
