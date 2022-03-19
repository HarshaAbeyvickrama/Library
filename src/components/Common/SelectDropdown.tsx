import React , {Component} from "react";
import Select from "react-select";
import {IAuthorOption} from "../../types/IAuthorOption";

interface SelectDropdownProps {
    options: IAuthorOption[],
    onChange: (e: any) => void,
}
const SelectDropdown : React.FC<SelectDropdownProps> = ({options,onChange}) =>{

    return(
        <Select
            options={options}
            onChange={onChange}
        />
    );
}

export default SelectDropdown;
