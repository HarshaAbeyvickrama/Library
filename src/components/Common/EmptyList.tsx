import React from 'react';

interface EmptyListProps {
    sectionTitle: String
}

const SectionTitle: React.FC<EmptyListProps> = ({sectionTitle}) => {
    return (
        <p className="fst-italic mt-md-3 mt-2">No {sectionTitle}s listed here</p>
    );
}
export default SectionTitle;
