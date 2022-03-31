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
    const customStyles = {
        indicatorSeparator: (provided: any, state: any) => ({
            ...provided,
            paddingLeft: '1px !important',
        }),
        control: (provided: any, state: any) => ({
            ...provided,
            boxShadow: '0px',
            borderColor: '#969696 !important',
            borderRadius: '0px',
            borderWidth: '2px',
        })
    }
    return (
        <Col className="input-field my-2 ms-lg-4">
            <span>{title}</span>
            <Select
                isClearable={true}
                className="select-dropdown"
                value={currentSelectedAuthor}
                options={options}
                onChange={onChange}
                styles={customStyles}
            />
        </Col>

    );
}

export default SelectDropdown;
