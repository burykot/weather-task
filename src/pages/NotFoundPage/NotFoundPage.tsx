import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';
import { SimplePageLayout } from '../../components/SimplePageLayout/SimplePageLayout';

const NotFoundPage = () => {
    return (
        <SimplePageLayout headline="404, page not found">
            <Link to="/" className="not-found-page__link">← go to search</Link>
        </SimplePageLayout>
    )
};

export { NotFoundPage };