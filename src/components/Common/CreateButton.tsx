import React from "react";
import {Button, Col} from "react-bootstrap";

interface CreateButtonProps {
    title: string,
}

const CreateButton: React.FC<CreateButtonProps> = ({title}) => {

    return (
        <Col className="mt-4 d-flex justify-content-end">
            <Button type="submit" className="px-4 py-1 create-button">
                {title}
            </Button>
        </Col>

    );
}

export default CreateButton;
