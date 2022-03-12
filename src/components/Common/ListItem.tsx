import React from 'react';
import {Edit, Trash2} from "react-feather";
import {Col, Row} from "react-bootstrap";

interface ListItemProps {
    name: String,
    index: number,
    onDeleteIconClicked: (authorIndex: number) => void
    onEditIconClicked: (itemIndex: number) => void
}

const ListItem: React.FC<ListItemProps> = ({name, index, onDeleteIconClicked,onEditIconClicked}) => {
    return (
        <Row className="list-item d-flex mx-0 py-1">
            <Col className="align-items-center ps-0" xs={9}>
                <span className="">{index + 1}. {name}</span>
            </Col>
            <Col className="d-none justify-content-end align-items-center list-item-icons" xs={3}>
                <Edit className="d-inline-block pe-sm-1 edit-icon me-2" onClick={() => {
                    onEditIconClicked(index);
                }}/>
                <Trash2 className="d-inline-block pe-sm-1 delete-icon" onClick={() => {
                    onDeleteIconClicked(index);
                }}/>
            </Col>
        </Row>

    );
}
export default ListItem;
