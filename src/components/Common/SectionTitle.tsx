import React from 'react';

interface SectionTitleProps {
    title: String,
}

const SectionTitle: React.FC<SectionTitleProps> = ({title}) => {
    return (
        <h3 className="section-title">{title}</h3>
    );
}
export default SectionTitle;
