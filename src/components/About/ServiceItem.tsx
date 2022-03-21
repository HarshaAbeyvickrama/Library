import React from "react";
import {Zap} from "react-feather";

interface ServiceItemProps{
    text: string
}

const ServiceItem: React.FC<ServiceItemProps> = ({text}) => {
    return(
        <div className="mx-5 px-4 my-1">
            <Zap className="icon-color"/>
            <span className="fs-5 service-item-text ms-3">{text}</span>
        </div>
    )
}

export default ServiceItem;
