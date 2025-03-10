import React, {useEffect} from "react";
import SweetAlert from "react-bootstrap-sweetalert";

interface SuccessTimeoutAlertProps {
    show: boolean,
    setShow: (show: boolean) => void,
    title: string,
    timeout: number
}

const SuccessTimeoutAlert: React.FC<SuccessTimeoutAlertProps> = ({show, setShow,title,timeout}) => {
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, timeout)
    }, [setShow, show])
    return (
        <SweetAlert
            success
            show={show}
            title={title}
            onConfirm={() => {
            }}
            showConfirm={false}
            closeAnim={{name: 'hideSweetAlert', duration: 100}}
        >

        </SweetAlert>
    );
}

export default SuccessTimeoutAlert;
