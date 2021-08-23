import React from 'react';
import { Layout } from '@mtfh/common';

import { locale } from '@services';
import { SearchFormLegacy } from '../../components/search-form-legacy';
import './styles.scss';

export const SearchViewLegacy = (): JSX.Element => {
    return (
        <Layout>
            <h1 className="lbh-heading-h1">{locale.search}</h1>
            <SearchFormLegacy className="mtfh-search-main" />
        </Layout>
    );
};
