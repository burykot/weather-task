import React from 'react';
import './Spinner.scss';

interface ISpinner {
    light?: boolean;
};

const Spinner: React.FC<ISpinner> = ({ light }) => {
    const classList = [
        'spinner',
        light ? 'spinner--light' : ''
    ].join(' ');
    
    return (
        <div className={classList}>
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    )
};

export { Spinner };