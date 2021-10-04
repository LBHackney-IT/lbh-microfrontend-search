import { useHistory } from 'react-router-dom';
import React from 'react';
import { Layout } from '@mtfh/common/lib/components';

import { locale } from '../../services';
import { SearchForm } from '../../components/search-form';
import './styles.scss';

export const SearchView = (): JSX.Element => {
    const history = useHistory();
    return (
        <Layout>
            <h1 className="lbh-heading-h1">{locale.search}</h1>
            <SearchForm
                className="mtfh-search-main"
                onSubmit={({ searchText, type }) => {
                    history.push(`/search/${type}?s=${searchText}`);
                }}
            />
        </Layout>
    );
};
