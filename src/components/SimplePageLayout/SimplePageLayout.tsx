import React from 'react';

import './SimplePageLayout.scss';

interface ISimplePageLayout {
    headline?: string
};

const SimplePageLayout: React.FC<ISimplePageLayout> = ({children, headline}) => {
    return (
        <div className="simple-page">
            {headline && <h1 className="simple-page__headline">{headline}</h1>}
            {children}
        </div>
    )
};

export { SimplePageLayout };