import React from "react";
import ListItem from "./ListItem";
import {IAuthor} from "../../types/IAuthor";
import {IBook} from "../../types/IBook";

interface ListProps {
    items: IAuthor[] | IBook[],
    onDeleteIconClicked: (itemIndex: number) => void,
    onEditIconClicked: (itemIndex: number) => void
}

const List: React.FC<ListProps> = ({items, onDeleteIconClicked , onEditIconClicked}) => {
    return (
        <div className="list my-4">
            {items.map((item, index) => (
                "authorName" in item
                    ? <ListItem name={item.authorName} index={index} key={index}
                                onDeleteIconClicked={onDeleteIconClicked} onEditIconClicked={onEditIconClicked}/>
                    : <ListItem name={item.title} index={index} key={index}
                                onDeleteIconClicked={onDeleteIconClicked} onEditIconClicked={onEditIconClicked}/>
            ))}
        </div>
    );
}
export default List;
