import React from 'react';

import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SimplePageLayout } from '../../components/SimplePageLayout/SimplePageLayout';

const Homepage = () => {
    return (
        <SimplePageLayout headline="Search for a city">
            <SearchForm />
        </SimplePageLayout>
    )
};

export { Homepage };