import React from 'react';
import { Layout } from '@mtfh/common';

import { locale } from '@services';
import { SearchForm } from '../../components/search-form';
import './styles.scss';

export const SearchView = (): JSX.Element => {
    return (
        <Layout>
            <h1 className="lbh-heading-h1">{locale.search}</h1>
            <SearchForm className="mtfh-search-main" />
        </Layout>
    );
};