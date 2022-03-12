import React from 'react';

interface SectionTitleProps {
    title: String,
}

const SectionTitle: React.FC<SectionTitleProps> = ({title}) => {
    return (
        <h2 className="section-title">{title}</h2>
    );
}
export default SectionTitle;
