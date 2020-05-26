import React from 'react';

import './Homepage.scss';
import { SearchForm } from '../../components/SearchForm/SearchForm';

const Homepage = () => {
    return (
        <div className="homepage">
            <h1 className="homepage__headline">Sprawdź pogodę</h1>
            <SearchForm />
        </div>
    )
};

export { Homepage };