import { useHistory } from 'react-router-dom';
import React from 'react';
import { Layout } from '@mtfh/common/lib/components';

import { locale } from '../../services';
import { SearchFormLegacy } from '../../components';
import './styles.scss';

export const SearchViewLegacy = (): JSX.Element => {
    const history = useHistory();
    return (
        <Layout>
            <h1 className="lbh-heading-h1">{locale.search}</h1>
            <SearchFormLegacy
                className="mtfh-search-main"
                onSubmit={({ searchText, type }) => {
                    history.push(`/search/${type}?s=${searchText}`);
                }}
            />
        </Layout>
    );
};
