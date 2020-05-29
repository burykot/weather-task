import React from 'react';

import './NotFoundPage.scss';
import { SimplePageLayout } from '../../components/SimplePageLayout/SimplePageLayout';
import { SearchForm } from '../../components/SearchForm/SearchForm';

const NotFoundPage = () => {
    return (
        <SimplePageLayout headline="404, page not found">
            <SearchForm />
        </SimplePageLayout>
    )
};

export { NotFoundPage };