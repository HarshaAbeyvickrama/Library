import React , {Component} from "react";
import Select from "react-select";
import {IAuthorOption} from "../../types/IAuthorOption";

const options:IAuthorOption[] = [

]
const SelectDropdown : React.FC = () =>{

    return(
        <Select options={options} />
    );
}

export default SelectDropdown;
