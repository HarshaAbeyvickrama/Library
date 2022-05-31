import React from "react";
import Select from "react-select";
import {IAuthorOption} from "../../types/IAuthorOption";
import {Col} from "react-bootstrap";

interface SelectDropdownProps {
    options: IAuthorOption[],
    onChange: (e: any) => void,
    currentSelectedAuthor: IAuthorOption | null,
    title: string,
    errorMessage?: string
}

const SelectDropdown: React.FC<SelectDropdownProps> = (
    {
        title,
        options,
        onChange,
        currentSelectedAuthor,
        errorMessage
    }) => {

    //styled for react select
    const customStyles = {
        indicatorSeparator: (provided: any, state: any) => ({
            ...provided,
            paddingLeft: '1px !important',
        }),
        control: (provided: any, state: any) => ({
            ...provided,
            boxShadow: '0px',
            borderColor: errorMessage ? 'red' : '#969696 !important',
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
            {errorMessage && <span className="text-danger">{errorMessage}</span>}
        </Col>

    );
}

export default SelectDropdown;
