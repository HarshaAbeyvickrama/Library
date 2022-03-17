import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

interface SuccessAlertProps {
    show: boolean,
    setShow: (show: boolean) => void,
    message: string
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({show, setShow, message}) => {
    return (
        <SweetAlert success title="Done!"
                    show={show}
                    onConfirm={() => {
                        setShow(false);
                    }}
        >
            {message}
        </SweetAlert>
    );
}

export default SuccessAlert;
