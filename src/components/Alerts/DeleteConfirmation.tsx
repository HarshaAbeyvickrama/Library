import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

interface DeleteConfirmationProps {
    onDelete: () => void,
    show: boolean,
    setShow: (show: boolean) => void,
    title: string,
    confirmBtnText: string
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({onDelete, show, setShow, title, confirmBtnText}) => {
    return (
        <SweetAlert
            show={show}
            warning
            showCancel
            confirmBtnText={confirmBtnText}
            confirmBtnBsStyle="danger"
            title={title}
            onConfirm={onDelete}
            onCancel={() => {
                setShow(false);
            }}
        >
            You will not be able to undo this action!
        </SweetAlert>
    );
}

export default DeleteConfirmation;
