import React from 'react';

import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SimplePageLayout } from '../../components/SimplePageLayout/SimplePageLayout';

const Homepage = () => {
    return (
        <SimplePageLayout headline="Check weather">
            <SearchForm />
        </SimplePageLayout>
    )
};

export { Homepage };