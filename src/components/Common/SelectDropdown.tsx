import React , {Component} from "react";
import Select from "react-select";
import {IAuthorOption} from "../../types/IAuthorOption";

interface SelectDropdownProps {
    options: IAuthorOption[],
    onChange: (e: any) => void,
    currentSelectedAuthor:IAuthorOption | null
}
const SelectDropdown : React.FC<SelectDropdownProps> = ({options,onChange,currentSelectedAuthor}) =>{

    return(
        <Select
            value={currentSelectedAuthor}
            options={options}
            onChange={onChange}
        />
    );
}

export default SelectDropdown;
